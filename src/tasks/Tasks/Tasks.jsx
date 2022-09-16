import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import Spinner from 'react-bootstrap/Spinner';
import { initUserAnswers, initTasks } from 'store';
import TasksComponent from './TasksComponent';

const Tasks = ({
  creator, modalId,
}) => {
  const userAnswerState = useSelector((state) => state.userAnswers);
  const { tasks: userAnswers, updatedBySocket: userUpdatedBySocket } = userAnswerState;
  const { list: tasks, id: tasksId, updatedBySocket } = useSelector((state) => state.tasks);
  const data = creator ? tasks : userAnswers;
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userAnswerState?.userName && !userUpdatedBySocket) {
      socket.emit('updateUserAnswers', JSON.stringify(userAnswerState));
    }
  }, [userAnswerState, userUpdatedBySocket]);

  useEffect(() => {
    if (!updatedBySocket) {
      socket.emit('updateTasks', JSON.stringify({ tasksId, tasks }));
    }
  }, [tasks, tasksId, updatedBySocket]);

  useEffect(() => {
    socket.on('loadUserAnswer', (userAnswerData) => {
      const loadedUserAnswer = JSON.parse(userAnswerData);
      dispatch(initUserAnswers(loadedUserAnswer));
    });
    socket.on('loadTasks', (tasksData) => {
      const [id, loadedList] = tasksData;
      const list = JSON.parse(loadedList);
      dispatch(initTasks({ id, list }));
    });
  }, []);

  return (
    <Container>
      {!data.length ? (
        <SpinnerContainer>
          <Spinner animation="border" variant="primary" />
        </SpinnerContainer>
      ) : (
        <TasksComponent
          data={data}
          creator={creator}
          modalId={modalId}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
`;
const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default Tasks;

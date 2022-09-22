import React, {
  useContext, useEffect, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import Spinner from 'react-bootstrap/Spinner';
import { initUserAnswers, initTasks } from 'store';
import { debounce, find } from 'lodash';
import { useParams } from 'react-router-dom';
import { GROUP_NAME_SEPARATOR } from 'constants';
import TasksComponent from './TasksComponent';

const Tasks = ({
  creator, modalId,
}) => {
  const { sheetId } = useParams();

  const userAnswerState = useSelector((state) => state.userAnswers);
  const { lessons } = useSelector((state) => state.appConnection);
  const lessonName = useMemo(
    () => find(
      lessons,
      (lesson) => +lesson.sheetId === +sheetId,
    )?.title.split(GROUP_NAME_SEPARATOR)?.[0],
    [lessons],
  );

  const {
    tasks: userAnswers,
    updatedBySocket: userUpdatedBySocket,
    updateByCheck,
  } = userAnswerState;
  const { list: tasks } = useSelector((state) => state.tasks);
  const data = creator ? tasks : userAnswers;
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const debounceAnswerUpdate = useCallback(debounce((answerState) => {
    socket.emit('updateUserAnswers', JSON.stringify(answerState));
  }, 500), []);

  useEffect(() => {
    if (userAnswerState?.userName && !userUpdatedBySocket && updateByCheck) {
      debounceAnswerUpdate(userAnswerState);
    }
  }, [userAnswerState, userUpdatedBySocket, updateByCheck, debounceAnswerUpdate]);

  useEffect(() => {
    socket.emit(creator ? 'adminJoinLesson' : 'userJoinLesson', sheetId);

    socket.on('loadUserAnswer', (userAnswerData) => {
      const loadedUserAnswer = JSON.parse(userAnswerData);
      dispatch(initUserAnswers(loadedUserAnswer));
    });
    socket.on('loadTasks', (tasksData) => {
      const [id, loadedList] = tasksData;
      const list = JSON.parse(loadedList || '[]');
      dispatch(initTasks({ id, list }));
    });

    return () => {
      socket.emit(creator ? 'adminLeaveLesson' : 'userLeaveLesson', sheetId);
      dispatch(initTasks({ id: null, list: [] }));
      dispatch(initUserAnswers({}));
    };
  }, []);

  return (
    <Container>
      <LessonName>
        {lessonName}
      </LessonName>
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

const LessonName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding-bottom: 150px;

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    padding-bottom: 200px;
  }
`;
const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Tasks;

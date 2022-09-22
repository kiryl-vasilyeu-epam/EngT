import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SpinnerContainer } from 'components';
import { Header } from 'features';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserRegistered, updateLesson, setLessons, deleteLesson,
} from 'store';

const RouteContainer = ({ children, creator }) => {
  const { connected } = useSelector((state) => state.appConnection);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('loadLessons', (data) => {
      const lessonsData = JSON.parse(data);
      dispatch(setLessons(lessonsData));
      dispatch(setUserRegistered());
    });
    socket.on('lessonUpdated', (data) => {
      const lessonsData = JSON.parse(data);
      dispatch(updateLesson(lessonsData));
    });
    socket.on('lessonDeleted', (sheetId) => {
      dispatch(deleteLesson(sheetId));
    });
  }, []);

  return (
    <>
      <Header creator={creator} />
      <ScrollContainer>
        <Content>
          <SpinnerContainer showSpinner={!connected}>
            {children}
          </SpinnerContainer>
        </Content>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.div`
  overflow: auto;
  display: flex;
  flex: 1;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding-top: 30px;
  width: 100%;
`;

export default RouteContainer;

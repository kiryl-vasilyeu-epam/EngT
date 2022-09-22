import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SpinnerContainer } from 'components';
import { Header } from 'features';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserRegistered, updateLesson, setLessons, deleteLesson,
} from 'store';
import { useParams, useNavigate } from 'react-router-dom';

const RouteContainer = ({ children, creator, picker }) => {
  const { sheetId } = useParams();
  const navigate = useNavigate();

  const { connected } = useSelector((state) => state.appConnection);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const onLoad = (data) => {
      const lessonsData = JSON.parse(data);
      dispatch(setLessons(lessonsData));
      dispatch(setUserRegistered());
    };
    const onUpdate = (data) => {
      const lessonsData = JSON.parse(data);
      dispatch(updateLesson(lessonsData));
    };
    const onDelete = (deletedSheetId) => {
      dispatch(deleteLesson(deletedSheetId));
      if (deletedSheetId === +sheetId) {
        navigate(creator ? '/admin_lessons' : '/');
      }
    };
    socket.on('loadLessons', onLoad);
    socket.on('lessonUpdated', onUpdate);
    socket.on('lessonDeleted', onDelete);

    return () => {
      socket.off('loadLessons', onLoad);
      socket.off('lessonUpdated', onUpdate);
      socket.off('lessonDeleted', onDelete);
    };
  }, []);

  return (
    <>
      <Header creator={creator} picker={picker} />
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

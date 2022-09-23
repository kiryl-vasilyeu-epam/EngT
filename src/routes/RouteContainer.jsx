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
import { COLORS } from 'constants';

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
    <Container>
      <Header creator={creator} picker={picker} />
      <Scroll>
        <SpinnerContainer showSpinner={!connected}>
          <Content>
            {children}
          </Content>
        </SpinnerContainer>
      </Scroll>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background: ${COLORS.BG_GRADIENT};
`;

const Scroll = styled.div`
  overflow: auto;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export default RouteContainer;

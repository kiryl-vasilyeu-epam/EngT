import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import Spinner from 'react-bootstrap/Spinner';
import { TextField, UserNameModal, WebsocketProvider } from 'features';
import { COLORS } from 'constants';

const TasksRoute = () => {
  const { connected } = useSelector((state) => state.appConnection);

  return (
    <Content>
      <WebsocketProvider>
        {connected ? (
          <>
            <Tasks />
            <UserNameModal />
            <Controls>
              <TextField />
            </Controls>
          </>
        ) : (
          <SpinnerContainer>
            <Spinner animation="border" variant="primary" />
          </SpinnerContainer>
        )}
      </WebsocketProvider>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1100px) {
    width: 100%;
  };
  width: 80%;
  padding-top: 20px;
  padding-bottom: 100px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Controls = styled.div`
  width: 80%;
  bottom: 0;
  padding-bottom: 20px;
  position: absolute;
  background-color: ${COLORS.BACKGROUND_COLOR};
  z-index: 3;
`;

export default TasksRoute;

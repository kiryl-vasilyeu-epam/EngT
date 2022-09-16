import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import Spinner from 'react-bootstrap/Spinner';
import { UserNameModal, WebsocketProvider } from 'features';

const TasksRoute = () => {
  const { connected } = useSelector((state) => state.appConnection);

  return (
    <Content>
      <WebsocketProvider>
        {connected ? (
          <>
            <Tasks />
            <UserNameModal />
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
  max-width: 1300px;

  padding: 20px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default TasksRoute;

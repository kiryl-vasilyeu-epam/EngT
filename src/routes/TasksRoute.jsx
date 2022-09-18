import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import Spinner from 'react-bootstrap/Spinner';
import {
  Header, TextField, UserNameModal, WebsocketProvider,
} from 'features';
import { COLORS } from 'constants';

const TasksRoute = () => {
  const { connected } = useSelector((state) => state.appConnection);

  return (
    <>
      <Header />
      <ScrollContainer>
        <Content>
          <WebsocketProvider>
            {connected ? (
              <TasksContainer>
                <Tasks />
                <UserNameModal />
                <Controls>
                  <TextField />
                </Controls>
              </TasksContainer>
            ) : (
              <SpinnerContainer>
                <Spinner animation="border" variant="primary" />
              </SpinnerContainer>
            )}
          </WebsocketProvider>
        </Content>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.div`
  overflow: auto;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 200px;
  width: 100%;
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
  padding-bottom: 10px;
  position: absolute;
  background-color: ${COLORS.BACKGROUND_COLOR};
  z-index: 2;
`;
const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default TasksRoute;

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
              <>
                <TasksContainer>
                  <Tasks />
                  <UserNameModal />
                </TasksContainer>
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
      </ScrollContainer>
    </>
  );
};

const Controls = styled.div`
  bottom: 0;
  padding-bottom: 10px;
  position: absolute;
  background: ${COLORS.BG_GRADIENT};
  z-index: 2;
  max-width: 2000px;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 90%;
  }
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 100%;
    padding: 5px;
  }
`;

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

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 90%;
    max-width: 2000px;
  }
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 100%;
    padding: 5px;
  }
`;

export default TasksRoute;

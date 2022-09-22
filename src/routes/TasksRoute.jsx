import React from 'react';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import {
  TextField, UserNameModal,
} from 'features';
import { COLORS } from 'constants';
import { useSelector } from 'react-redux';
import { SpinnerContainer } from 'components';
import RouteContainer from './RouteContainer';

const TasksRoute = () => {
  const { userRegistered } = useSelector((state) => state.appConnection);

  return (
    <RouteContainer>
      <TasksContainer>
        <SpinnerContainer showSpinner={!userRegistered}>
          <Tasks />
        </SpinnerContainer>
      </TasksContainer>
      <Controls>
        <TextField />
      </Controls>
      <UserNameModal />
    </RouteContainer>
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

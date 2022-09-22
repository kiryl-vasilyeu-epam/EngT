import React, {
  useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import {
  CreateTemplateModal,
  CheckPasswordModal,
  ControlPanel,
  UserAnswerModal,
  CreatorsControls,
} from 'features';
import { showModal } from 'store';
import { SpinnerContainer } from 'components';
import RouteContainer from './RouteContainer';

const TemplatesRoute = () => {
  const [modalId, handleModalId] = useState(null);
  const [passwordChecked, setPasswordChecked] = useState(null);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(showModal({ modalId }));
  }, [modalId]);
  const { list: tasks, id } = useSelector((state) => state.tasks);
  const { userRegistered } = useSelector((state) => state.appConnection);

  return (
    <RouteContainer creator>
      <CheckPasswordModal setPasswordChecked={setPasswordChecked} />
      {
        passwordChecked && (
          <>
            <ControlPanel />
            <TemplatesContainer>
              <SpinnerContainer showSpinner={!userRegistered}>
                <Tasks
                  creator
                  modalId={modalId}
                />
              </SpinnerContainer>
            </TemplatesContainer>
            <CreatorsControls id={id} tasks={tasks} openModal={openModal} />
            <CreateTemplateModal handleModalId={handleModalId} />
            <UserAnswerModal />
          </>
        )
      }
    </RouteContainer>
  );
};

const TemplatesContainer = styled.div`
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

export default TemplatesRoute;

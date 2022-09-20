import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import {
  CreateTemplateModal, CheckPasswordModal, ControlPanel, WebsocketProvider, Header,
} from 'features';
import { showModal } from 'store';
import Spinner from 'react-bootstrap/Spinner';
import { UserAnswerModal } from 'features/UserAnswerModal';
import CreatorsControls from './CreatorsControls';

const TemplatesRoute = () => {
  const { connected } = useSelector((state) => state.appConnection);

  const [modalId, handleModalId] = useState(null);
  const [passwordChecked, setPasswordChecked] = useState(null);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(showModal({ modalId }));
  }, [modalId]);
  const { list: tasks, id } = useSelector((state) => state.tasks);
  return (
    <>
      <Header creator />
      <ScrollContainer>

        <Content>
          <WebsocketProvider>
            {connected ? (
              <>
                <CheckPasswordModal setPasswordChecked={setPasswordChecked} />
                {passwordChecked && (
                <>
                  <ControlPanel />
                  <TemplatesContainer>
                    <Tasks
                      creator
                      modalId={modalId}
                    />
                  </TemplatesContainer>
                  <CreatorsControls id={id} tasks={tasks} openModal={openModal} />
                  <CreateTemplateModal handleModalId={handleModalId} />
                  <UserAnswerModal />
                </>
                )}
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

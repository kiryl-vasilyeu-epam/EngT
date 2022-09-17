import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import {
  CreateTemplateModal, CheckPasswordModal, ControlPanel, WebsocketProvider,
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
                  <CreatorsControls id={id} tasks={tasks} openModal={openModal} />
                </TemplatesContainer>
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
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 300px;
  width: 100%;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TemplatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default TemplatesRoute;

import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import { CreateTemplateModal, CheckPasswordModal, ControlPanel } from 'features';
import { showModal, loadTasks } from 'store';
import { isNull } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import CreatorsControls from './CreatorsControls';

const TemplatesRoute = () => {
  const [modalId, handleModalId] = useState(null);
  const [passwordChecked, setPasswordChecked] = useState(null);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(showModal({ modalId }));
  }, [modalId]);
  const { list: tasks, loading, id } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (isNull(loading)) {
      dispatch(loadTasks());
    }
  }, [loading]);

  return (
    <Content>
      {(loading || !passwordChecked) ? (
        <SpinnerContainer>
          <Spinner animation="border" variant="primary" />
        </SpinnerContainer>
      ) : (
        <>
          <ControlPanel />
          <TemplatesContainer>
            <Tasks
              creator
              modalId={modalId}
            />
            <CreatorsControls id={id} tasks={tasks} openModal={openModal} loading={loading} />
          </TemplatesContainer>
        </>
      )}
      <CreateTemplateModal handleModalId={handleModalId} />
      <CheckPasswordModal setPasswordChecked={setPasswordChecked} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TemplatesContainer = styled.div``;

export default TemplatesRoute;

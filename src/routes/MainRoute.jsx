import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import { CreateTemplateModal } from 'features';
import { showModal, loadTasks } from 'store';
import { isNull } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import CreatorsControls from './CreatorsControls';

const MainRoute = ({ creator }) => {
  const [modalId, handleModalId] = useState(null);
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
      {loading ? (
        <SpinnerContainer>
          <Spinner animation="border" variant="primary" />
        </SpinnerContainer>
      ) : (
        <Tasks
          creator={creator}
          modalId={modalId}
        />
      )}
      {
        creator && (
          <>
            <CreatorsControls id={id} tasks={tasks} openModal={openModal} loading={loading} />
            <CreateTemplateModal handleModalId={handleModalId} />
          </>
        )
      }

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

export default MainRoute;

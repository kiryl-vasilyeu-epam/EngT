import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import { CreateTemplateModal } from 'features';
import { RoundIconButton } from 'components';
import { showModal } from 'store';

const CreatorsRoute = () => {
  const [modalId, handleModalId] = useState(null);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(showModal(modalId));
  }, [modalId]);

  return (
    <Content>
      Creator
      <Tasks creator />
      <ButtonContainer>
        <RoundIconButton onClick={openModal} />
      </ButtonContainer>
      <CreateTemplateModal handleModalId={handleModalId} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 1000px;

  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
`;

export default CreatorsRoute;

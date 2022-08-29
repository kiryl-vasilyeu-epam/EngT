import React, { useState } from 'react';
import styled from 'styled-components';
import CreateTemplateModal from '../components/CreateTemplateModal/CreateTemplateModal';
import RoundIconButton from '../components/RoundIconButton/RoundIconButton';
import Tasks from '../tasks/Tasks/Tasks';

const CreatorsRoute = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <Content>
      Creator
      <Tasks creator />
      <ButtonContainer>
        <RoundIconButton onClick={openModal} />
      </ButtonContainer>
      <CreateTemplateModal setOpen={setOpenModal} />
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

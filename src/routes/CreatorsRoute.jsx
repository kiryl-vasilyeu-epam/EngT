import React, { useState } from 'react';
import styled from 'styled-components';
import CreateTemplateModal from '../components/CreateTemplateModal/CreateTemplateModal';
import RoundIconButton from '../components/RoundIconButton/RoundIconButton';
import Tasks from '../tasks/Tasks/Tasks';

const CreatorsRoute = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <Content>
      <Tasks />
      <RoundIconButton onClick={openModal} />
      <CreateTemplateModal setOpen={setOpenModal} />
    </Content>
  );
};

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export default CreatorsRoute;

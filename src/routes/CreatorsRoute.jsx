import React, { useState } from 'react';
import styled from 'styled-components';
import CreateTemplateModal from '../components/CreateTemplateModal/CreateTemplateModal';
import RoundIconButton from '../components/RoundIconButton/RoundIconButton';

const CreatorsRoute = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <Content>
      <RoundIconButton onClick={openModal} />
      <CreateTemplateModal setOpen={setOpenModal} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default CreatorsRoute;

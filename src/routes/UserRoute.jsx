import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonText from '../components/ButtonText/ButtonText';
import Tasks from '../tasks/Tasks/Tasks';

const UserRoute = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <Content>
      user
      <Tasks />
      <ButtonText title="Check" primary />
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

export default UserRoute;

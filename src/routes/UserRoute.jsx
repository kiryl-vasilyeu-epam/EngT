import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonText from '../components/ButtonText/ButtonText';
import Tasks from '../tasks/Tasks/Tasks';

const UserRoute = () => {
  const [checked, setChecked] = useState(false);
  const onCheckHandler = () => {
    setChecked(true);
  };

  return (
    <Content>
      user
      <Tasks
        checked={checked}
        setChecked={setChecked}
      />
      <ButtonText
        title={checked ? 'Checked' : 'Check'}
        primary={!checked}
        onClick={onCheckHandler}
      />
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

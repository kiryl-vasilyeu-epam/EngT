import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonText } from 'components';
import { Tasks } from 'tasks';
import { setChecked } from 'store';

const UserRoute = () => {
  const dispatch = useDispatch();
  const checked = useSelector((state) => state.userAnswers.checked);

  const onCheckHandler = () => {
    dispatch(setChecked(!checked));
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

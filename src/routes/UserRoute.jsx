import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonText from '../components/ButtonText/ButtonText';
import Tasks from '../tasks/Tasks/Tasks';
import { saveAnswers } from '../store/userAnswersSlice';

const UserRoute = () => {
  const dispatch = useDispatch();
  const userAnswers = useSelector((state) => state.userAnswers);
  const [checked, setChecked] = useState(false);
  const [currentUserAnswers, setCurrentUserAnswers] = useState(null);

  const onCheckHandler = () => {
    setChecked(true);
    dispatch(
      saveAnswers(
        currentUserAnswers,
      ),
    );
  };

  return (
    <Content>
      user
      <Tasks
        checked={checked}
        setChecked={setChecked}
        userAnswers={userAnswers}
        setCurrentUserAnswers={setCurrentUserAnswers}
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

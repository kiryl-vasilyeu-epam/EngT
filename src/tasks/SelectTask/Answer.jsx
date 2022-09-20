import React from 'react';
import styled from 'styled-components';

import {
  Check,
} from 'components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Answer = ({
  answer, creator, checked, multiline, questionId, onAnswerHandler,
}) => {
  const {
    title, isCorrect, userAnswer = false, id,
  } = answer;

  const isActiveByUser = checked ? (userAnswer || isCorrect) : userAnswer;
  const isActive = creator
    ? isCorrect
    : isActiveByUser;
  const isUserCorrectAnswer = userAnswer === isCorrect;
  const isShowResult = checked && (userAnswer || isCorrect);
  const correctionColor = creator || (checked && isCorrect);
  const disabled = checked || creator;

  const onCheckPress = (value) => {
    onAnswerHandler(questionId, id, value);
  };

  return (
    <Container>
      <IconContainer correct={isUserCorrectAnswer}>
        {isShowResult && (
          <FontAwesomeIcon
            icon={isUserCorrectAnswer ? faCheck : faXmark}
          />
        )}
      </IconContainer>
      <Check
        checked={isActive}
        onChange={onCheckPress}
        isValid={correctionColor}
        disabled={disabled}
        radio={!multiline}
      />
      <Text>
        {title}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  min-width: 20px;
  height: 20px;
  font-size: 20px;
  color: ${({ correct }) => (correct ? 'limegreen' : 'red')};
  margin-right: 3px;
`;

const Text = styled.div`
  margin-left: 15px;
`;

export default Answer;

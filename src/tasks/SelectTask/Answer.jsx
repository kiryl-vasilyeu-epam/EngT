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
  align-items: center;
  margin: 3px 0;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: ${({ correct }) => (correct ? 'limegreen' : 'red')}
`;

const Text = styled.div`
  margin-left: 16px;
`;

export default Answer;

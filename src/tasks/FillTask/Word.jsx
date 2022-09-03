import { Input } from 'components';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked,
}) => {
  const {
    title, isActive, userAnswer,
  } = word;

  const onChange = useCallback((answer) => {
    onAnswerHandler(questionId, word.id, answer);
  }, [word, questionId, onAnswerHandler]);

  const value = creator ? title : userAnswer;
  const isCorrect = creator || (checked && title === userAnswer);
  const isIncorrect = checked && !isCorrect;

  return (
    <Container>
      {isActive ? (
        <Input
          value={value}
          onChange={onChange}
          isValid={isCorrect}
          isInvalid={isIncorrect}
          disabled={checked || creator}
        />
      ) : title}
    </Container>
  );
};

const Container = styled.div`
  margin-right: 5px;
  // border: 1px solid red;
`;

export default Word;

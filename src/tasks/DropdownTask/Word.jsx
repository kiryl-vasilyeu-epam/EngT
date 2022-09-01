import { Dropdown } from 'components';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked,
}) => {
  const {
    title, options, isActive, userAnswer,
  } = word;
  const values = [
    ...options,
    { title, id: title },
  ];

  const onChange = useCallback((answer) => {
    onAnswerHandler(questionId, word.id, answer);
  }, [word, questionId, onAnswerHandler]);

  const value = creator ? title : userAnswer;
  const isCorrect = creator || (checked && title === userAnswer);
  const isIncorrect = checked && !isCorrect;

  return (
    <Container>
      {isActive ? (
        <Dropdown
          value={value}
          values={values}
          onChange={onChange}
          isCorrect={isCorrect}
          isIncorrect={isIncorrect}
          tooltip={isIncorrect && title}
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

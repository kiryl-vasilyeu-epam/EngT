import { Dropdown } from 'components';
import { sortBy } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked,
}) => {
  const {
    title, options, isActive, userAnswer,
  } = word;
  const values = useMemo(() => sortBy([
    ...options,
    { title, id: title },
  ], ['title']), [options, title]);

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
`;

export default Word;

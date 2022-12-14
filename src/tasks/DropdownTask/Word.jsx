import { Dropdown } from 'components';
import { NEW_LINE } from 'constants';
import { sortBy } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked, viewOnly,
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
  if (title === NEW_LINE) {
    return <LineBreak />;
  }

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
          disabled={checked || creator || viewOnly}
        />
      ) : title}
    </Container>
  );
};

const Container = styled.div`
  margin-right: 5px;
`;

const LineBreak = styled.div`
  width: 100%;
`;

export default Word;

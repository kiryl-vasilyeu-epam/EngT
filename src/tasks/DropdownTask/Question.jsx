import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ColoredContainer } from 'components';
import { filter } from 'lodash';
import { getCorrection } from '../helpers';

import Word from './Word';

const Question = ({
  question, checked, creator, onAnswerHandler, index,
}) => {
  const { words, id } = question;
  let correction = null;
  const predicate = useCallback(
    ({ isActive, userAnswer, title }) => isActive && userAnswer === title,
    [],
  );
  const correctAnswersList = useMemo(
    () => filter(words, { isActive: true }),
    [words],
  );
  const userCorrectAnswersList = useMemo(
    () => filter(words, predicate),
    [words],
  );

  if (checked) {
    correction = getCorrection(correctAnswersList, userCorrectAnswersList);
  }

  return (
    <ColoredContainer correction={correction}>
      <WordsContainer>
        <NumContainer>
          {`${index + 1}.`}
        </NumContainer>

        {words.map((word) => (
          <Word
            key={word.id}
            word={word}
            onAnswerHandler={onAnswerHandler}
            questionId={id}
            creator={creator}
            checked={checked}
          />
        ))}
      </WordsContainer>
    </ColoredContainer>
  );
};

const NumContainer = styled.div`
  padding-right: 5px;
  font-weight: 500;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;
`;

export default Question;

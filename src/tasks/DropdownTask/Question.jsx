import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ColoredBorder } from 'components';
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
    <ColoredBorder correction={correction}>
      <Content>
        {`${index + 1}.`}
        <WordsContainer>
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
      </Content>
    </ColoredBorder>
  );
};
const Content = styled.div`
  display: flex;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;
`;

export default Question;

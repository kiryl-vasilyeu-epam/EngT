import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ColoredBorder } from 'components';
import { filter } from 'lodash';
import { getCorrection } from '../helpers';

import Word from './Word';

const Question = ({
  question, checked, creator, onAnswerHandler, index, activeWord,
}) => {
  const { words, id } = question;

  const predicate = useCallback(
    ({ isActive, userAnswer, title }) => isActive && userAnswer?.title === title,
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

  let correction = null;
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
              activeWord={activeWord}
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

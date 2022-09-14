import React, { useCallback, useMemo } from 'react';
import { filter } from 'lodash';
import { getCorrection } from '../helpers';
import { QuestionContainer } from '../components';

import Word from './Word';

const Question = ({
  question, checked, creator, onAnswerHandler, index, activeWord,
}) => {
  const { words, id, picture } = question;

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
    <QuestionContainer
      correction={correction}
      picture={picture}
      index={index}
    >
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
    </QuestionContainer>
  );
};

export default Question;

import React, { useCallback, useMemo } from 'react';
import { filter } from 'lodash';
import { getCorrection, normalizeString } from '../helpers';
import { QuestionContainer } from '../components';

import Word from './Word';

const Question = ({
  question, checked, creator, onAnswerHandler, index, viewOnly,
}) => {
  const { words, id, picture } = question;
  let correction = null;
  const predicate = useCallback(
    ({ isActive, userAnswer, title }) => (
      isActive && normalizeString(userAnswer) === normalizeString(title)
    ),
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
          viewOnly={viewOnly}
        />
      ))}
    </QuestionContainer>
  );
};

export default Question;

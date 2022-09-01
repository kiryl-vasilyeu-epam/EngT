import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { filter } from 'lodash';
import { ColoredBorder } from 'components';
import Answer from './Answer';
import { getCorrection } from '../helpers';

const Question = ({
  question, checked, creator, index, onAnswerHandler,
}) => {
  const {
    answers, title, multiline, id,
  } = question;
  let correction = null;
  const predicate = useCallback(
    ({ isCorrect, userAnswer }) => userAnswer && userAnswer === isCorrect,
    [],
  );
  const correctAnswersList = useMemo(
    () => filter(answers, { isCorrect: true }),
    [answers],
  );
  const userCorrectAnswersList = useMemo(
    () => filter(answers, predicate),
    [answers],
  );

  if (checked) {
    correction = getCorrection(correctAnswersList, userCorrectAnswersList);
  }

  return (
    <ColoredBorder correction={correction}>
      <Subtitle>{`${index + 1}. ${title}`}</Subtitle>
      <AnswerContainer>
        {answers.map((answer) => (
          <Answer
            key={answer.id}
            questionId={id}
            answer={answer}
            checked={checked}
            creator={creator}
            multiline={multiline}
            onAnswerHandler={onAnswerHandler}
          />
        ))}
      </AnswerContainer>
    </ColoredBorder>
  );
};

const Subtitle = styled.div`
  font-size: 25px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export default Question;

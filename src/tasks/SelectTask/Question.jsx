import React, { useMemo } from 'react';
import styled from 'styled-components';
import { filter } from 'lodash';
import { ColoredContainer } from 'components';
import Answer from './Answer';
import { getCorrection } from '../helpers';

const Question = ({
  question, checked, creator, index, onAnswerHandler,
}) => {
  const {
    answers, title, multiline, id,
  } = question;
  let correction = null;

  const userAnswers = useMemo(
    () => filter(answers, ({ userAnswer }) => !!userAnswer),
    [answers],
  );
  const correctAnswersList = useMemo(
    () => filter(answers, { isCorrect: true }),
    [answers],
  );
  const userCorrectAnswersList = useMemo(
    () => filter(userAnswers, ({ isCorrect, userAnswer }) => userAnswer === isCorrect),
    [userAnswers],
  );

  if (checked) {
    correction = getCorrection(correctAnswersList, userCorrectAnswersList, userAnswers);
  }

  return (
    <ColoredContainer correction={correction}>
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
    </ColoredContainer>
  );
};

const Subtitle = styled.div`
  font-size: 25px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Question;

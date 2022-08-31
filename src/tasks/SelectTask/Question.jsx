import React from 'react';
import styled from 'styled-components';
import { filter } from 'lodash';
import Answer from './Answer';

const Question = ({
  question, checked, creator, index, onAnswerHandler,
}) => {
  const {
    answers, title, multiline, id,
  } = question;
  let correction = null;
  const predicate = ({ isCorrect }) => {
    const userAnswer = true; // userAnswers?.[index]?.[answerIndex];
    return userAnswer && userAnswer === isCorrect;
  };

  const correctAnswersList = filter(answers, { isCorrect: true });
  const userCorrectAnswersList = filter(answers, predicate);

  if (checked) {
    if (correctAnswersList.length === userCorrectAnswersList.length) {
      correction = 'correct';
    } else if (userCorrectAnswersList.length > 0) {
      correction = 'partially';
    } else {
      correction = 'incorrect';
    }
  }

  return (
    <Container correction={correction}>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  margin: 15px 0;
  border: 4px solid ${({ correction }) => {
    if (correction === 'correct') {
      return 'limegreen';
    } if (correction === 'partially') {
      return 'rgb(250, 210, 0)';
    } if (correction === 'incorrect') {
      return 'red';
    }
    return 'rgba(0, 0, 0, 0.1)';
  }};
  border-radius: 10px;
`;

const Subtitle = styled.div`
  font-size: 25px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export default Question;

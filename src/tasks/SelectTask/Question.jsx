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
  const predicate = ({ isCorrect, userAnswer }) => userAnswer && userAnswer === isCorrect;

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
  border: 2px solid ${({ correction }) => {
    if (correction === 'correct') {
      return '#14A44D';
    } if (correction === 'partially') {
      return '#E4A11B';
    } if (correction === 'incorrect') {
      return '#DC4C64';
    }
    return '#9FA6B2';
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

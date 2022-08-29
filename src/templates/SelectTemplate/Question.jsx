/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import { Row, ButtonContainer } from './common';
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Checkbox/Checkbox';
import RoundIconButton from '../../components/RoundIconButton/RoundIconButton';
import IconButton from '../../components/IconButton/IconButton';

const Question = ({
  questionData: { question, answers },
  index,
  handleQuestionChange,
  handleAnswerChange,
  handleCorrectionChange,
  addAnswer,
  deleteQuestion,
  deleteAnswer,
}) => (
  <Container>
    <Row>
      <Subtitle>
        Question:
      </Subtitle>
      <Input
        value={question}
        onChange={handleQuestionChange(index)}
        placeholder="Write a question"
      />

      <IconButton iconName="faTrashCan" onClick={deleteQuestion(index)} />
    </Row>

    <Column>
      <Subtitle>
        Answers:
      </Subtitle>
      {
        answers.map((answer, answerIndex) => (
          <Row key={`answer_${index}_${answerIndex}`}>
            <Checkbox
              checked={answer.isCorrect}
              onChange={handleCorrectionChange(index, answerIndex)}
            />
            <Input
              value={answer.title}
              onChange={handleAnswerChange(index, answerIndex)}
              placeholder="Write an answer"
            />
            <IconButton iconName="faDeleteLeft" onClick={deleteAnswer(index, answerIndex)} />
          </Row>
        ))
      }

      <ButtonContainer>
        <RoundIconButton onClick={addAnswer(index)} />
      </ButtonContainer>

    </Column>

  </Container>
);

const Container = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px 0;
`;

const Column = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Subtitle = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

export default Question;

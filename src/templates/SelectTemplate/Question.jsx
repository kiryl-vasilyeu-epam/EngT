/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import {
  Input, Checkbox, RoundIconButton, IconButton,
} from 'components';
import { Row } from './common';

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
      <Answers>
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
      </Answers>

      <ButtonContainer>
        <RoundIconButton onClick={addAnswer(index)} />
      </ButtonContainer>

    </Column>

  </Container>
);

const Container = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.3);
  padding: 16px 20px;
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

const Answers = styled.div`
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 66px;
`;

export default Question;

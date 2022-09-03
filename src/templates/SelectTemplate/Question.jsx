import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
  Input, RoundIconButton, IconButton,
} from 'components';
import { COLORS } from 'constants';
import { Row } from './common';
import Answer from './Answer';

const Question = ({
  questionData: { title, answers, id },
  handleQuestionChange,
  handleAnswerChange,
  addAnswer,
  deleteQuestion,
  deleteAnswer,
}) => {
  const onTitleChange = useCallback((value) => {
    handleQuestionChange(id, value);
  }, [id, handleQuestionChange]);

  const onDelete = useCallback(() => {
    deleteQuestion(id);
  }, [id, deleteQuestion]);

  const onAddAnswer = useCallback(() => {
    addAnswer(id);
  }, [id, addAnswer]);

  return (
    <Container>

      <Row>
        <Subtitle>
          Question:
        </Subtitle>
        <Input
          value={title}
          onChange={onTitleChange}
          placeholder="Write a question"
        />
        <IconButton
          iconName="faTrashCan"
          onClick={onDelete}
        />
      </Row>

      <Column>

        <Subtitle>
          Answers:
        </Subtitle>

        <Answers>
          {answers.map((answer) => (
            <Answer
              key={answer.id}
              answer={answer}
              questionId={id}
              handleAnswerChange={handleAnswerChange}
              deleteAnswer={deleteAnswer}
            />
          ))}
        </Answers>

        <ButtonContainer>
          <RoundIconButton onClick={onAddAnswer} />
        </ButtonContainer>

      </Column>

    </Container>
  );
};

const Container = styled.div`
  border: 2px solid ${COLORS.BORDER_COLOR};
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

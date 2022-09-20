import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import {
  Input, ButtonText,
} from 'components';
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
    <CardElement>
      <Card.Body>
        <Margin>
          Question
          <Row>
            <InputMargin>
              <Input
                value={title}
                onChange={onTitleChange}
                placeholder="Write a question"
              />
            </InputMargin>
            <ButtonText
              size="sm"
              title="Delete"
              onClick={onDelete}
              variant="danger"
              outline
            />
          </Row>
        </Margin>
        Answers
        {answers.map((answer) => (
          <Answer
            key={answer.id}
            answer={answer}
            questionId={id}
            handleAnswerChange={handleAnswerChange}
            deleteAnswer={deleteAnswer}
          />
        ))}
        <Margin>
          <ButtonText
            size="sm"
            title="Add answer"
            onClick={onAddAnswer}
            outline
          />
        </Margin>
      </Card.Body>

    </CardElement>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CardElement = styled(Card)`
  border: none;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  margin-bottom: 30px;
`;

const Margin = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 16px;
`;

const InputMargin = styled.div`
  @media (min-width: 1100px) {
    margin-right: 30px;
  };
  flex: 1;
`;

export default Question;

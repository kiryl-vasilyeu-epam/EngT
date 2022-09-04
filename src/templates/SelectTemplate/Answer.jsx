import React, { useCallback } from 'react';
import {
  Input, Check, ButtonText,
} from 'components';
import styled from 'styled-components';
import { Row } from './common';

const Answer = ({
  answer: { id, isCorrect, title },
  questionId,
  handleAnswerChange,
  deleteAnswer,
}) => {
  const onCorrectionChange = useCallback((isCorrectValue) => {
    handleAnswerChange(
      questionId,
      id,
      { isCorrect: isCorrectValue },
    );
  }, [questionId, id, handleAnswerChange]);

  const onTitleChange = useCallback((titleValue) => {
    handleAnswerChange(
      questionId,
      id,
      { title: titleValue },
    );
  }, [questionId, id, handleAnswerChange]);

  const onDeleteAnswer = useCallback(() => {
    deleteAnswer(questionId, id);
  }, [questionId, id, deleteAnswer]);

  return (
    <Row>
      <Input
        value={title}
        onChange={onTitleChange}
        placeholder="Write an answer"
      />

      <Margin>
        {isCorrect ? 'Correct' : 'Incorrect'}
        <Check
          checked={isCorrect}
          onChange={onCorrectionChange}
        />
      </Margin>

      <ButtonText
        size="sm"
        title="Delete"
        onClick={onDeleteAnswer}
        variant="danger"
        outline
      />
    </Row>
  );
};

const Margin = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  width: 140px;
  align-items: center;
  justify-content: center;
`;

export default Answer;

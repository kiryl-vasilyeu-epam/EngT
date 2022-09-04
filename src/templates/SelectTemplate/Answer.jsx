import React, { useCallback } from 'react';
import {
  Input, Check, IconButton,
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
      <Check
        checked={isCorrect}
        onChange={onCorrectionChange}
      />
      <Margin>
        <Input
          value={title}
          onChange={onTitleChange}
          placeholder="Write an answer"
        />
      </Margin>
      <IconButton
        iconName="faDeleteLeft"
        onClick={onDeleteAnswer}
      />
    </Row>
  );
};

const Margin = styled.div`
  flex: 1;
  margin: 0 10px;
`;

export default Answer;

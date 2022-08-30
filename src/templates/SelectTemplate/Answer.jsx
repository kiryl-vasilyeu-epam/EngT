import React, { useCallback } from 'react';
import {
  Input, Checkbox, IconButton,
} from 'components';
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
      <Checkbox
        checked={isCorrect}
        onChange={onCorrectionChange}
      />
      <Input
        value={title}
        onChange={onTitleChange}
        placeholder="Write an answer"
      />
      <IconButton
        iconName="faDeleteLeft"
        onClick={onDeleteAnswer}
      />
    </Row>
  );
};

export default Answer;

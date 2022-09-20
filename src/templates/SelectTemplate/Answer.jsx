import React, { useCallback } from 'react';
import {
  Input, Check, ButtonText,
} from 'components';
import styled from 'styled-components';

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
      <MarginRight>
        <Check
          checked={isCorrect}
          onChange={onCorrectionChange}
        />
      </MarginRight>

      <Input
        value={title}
        onChange={onTitleChange}
        placeholder="Write an answer"
      />

      <MarginLeft>
        <ButtonText
          size="sm"
          title="Delete"
          onClick={onDeleteAnswer}
          variant="danger"
          outline
        />
      </MarginLeft>
    </Row>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const MarginLeft = styled.div`
  display: flex;
  margin-left: 30px;
`;

const MarginRight = styled.div`
  display: flex;
  margin-right: 15px;
  margin-left: 5px
`;

export default Answer;

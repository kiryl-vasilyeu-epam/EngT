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

      <Controls>

        <Margin>
          <Title>
            {isCorrect ? 'Correct' : 'Incorrect'}
          </Title>
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
      </Controls>

    </Row>
  );
};

const Margin = styled.div`
  display: flex;
  @media (min-width: 1100px) {
    flex-direction: column;
    margin: 0;
    margin-right: 5px;
    align-items: center;
    justify-content: center;
  };
  margin: 10px 0;
`;

const Title = styled.div`
  text-align: center;
  width: 100px;
  justify-content: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1100px) {
    margin: 5px 0;
  };
`;

export default Answer;

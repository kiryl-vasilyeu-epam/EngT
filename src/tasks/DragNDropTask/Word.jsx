import { BACKGROUND_COLOR } from 'constants';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked,
}) => {
  const {
    title, isActive, userAnswer,
  } = word;

  const value = creator ? title : userAnswer?.title;
  const isCorrect = creator || (checked && title === userAnswer?.title);
  const isIncorrect = checked && !isCorrect;

  const [withHighlight, setWithHighlight] = useState(false);

  const onDragEnter = useCallback(() => {
    setWithHighlight(true);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback(() => {
    setWithHighlight(false);
  }, []);

  const onDrop = useCallback((e) => {
    setWithHighlight(false);
    const answer = JSON.parse(e.dataTransfer.getData('drag'));
    onAnswerHandler(questionId, word.id, answer);
  }, [questionId, word, onAnswerHandler]);

  const onClick = useCallback(() => {
    if (userAnswer) {
      onAnswerHandler(questionId, word.id, userAnswer, true);
    }
  }, [questionId, word, onAnswerHandler]);

  return (
    <Container>
      {isActive ? (
        <DragPoints
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          withHighlight={withHighlight}
          onDrop={onDrop}
          onClick={onClick}
        >
          {value || '\xa0'}
        </DragPoints>
      ) : title}
    </Container>
  );
};

const Container = styled.div`
  margin-right: 5px;
`;

const DragPoints = styled.div`
  border: 2px solid #9FA6B2;
  outline: 5px solid ${
  ({ withHighlight }) => (withHighlight ? '#2962FF' : BACKGROUND_COLOR)
};
  border-radius: 7px;
  padding: 0px 10px;
  margin: 3px 0;
  min-width: 100px;
  transition: outline .3s;
  cursor: pointer;
`;

export default Word;

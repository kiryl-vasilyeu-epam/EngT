import { COLORS } from 'constants';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked, activeWord,
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
    onAnswerHandler({
      questionId,
      wordId: word.id,
      userAnswer: answer,
      currentUserAnswer: userAnswer,
    });
  }, [questionId, word, onAnswerHandler]);

  const onClick = useCallback(() => {
    if (activeWord) {
      onAnswerHandler({
        questionId,
        wordId: word.id,
        userAnswer: activeWord,
        currentUserAnswer: userAnswer,
      });
    } else if (userAnswer) {
      onAnswerHandler({
        questionId,
        wordId: word.id,
        userAnswer,
        isRemove: true,
      });
    }
  }, [questionId, word, onAnswerHandler, activeWord]);

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
          isCorrect={isCorrect}
          isIncorrect={isIncorrect}
          withHover={!!activeWord}
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
  border: 2px solid ${COLORS.BORDER_COLOR};
  outline: 4px solid ${
  ({ withHighlight, isCorrect, isIncorrect }) => {
    if (isCorrect) {
      return COLORS.SUCCESS_COLOR;
    } if (isIncorrect) {
      return COLORS.ERROR_COLOR;
    }

    return withHighlight ? COLORS.PRIMARY_COLOR : COLORS.BACKGROUND_COLOR;
  }
};
  border-radius: 7px;
  padding: 0px 10px;
  margin: 3px 0;
  min-width: 100px;
  transition: outline .3s;
  cursor: pointer;

  &:hover {
    ${({ withHover }) => (withHover ? `outline: 3px solid ${COLORS.PRIMARY_COLOR};` : '')}
  }
`;

export default Word;

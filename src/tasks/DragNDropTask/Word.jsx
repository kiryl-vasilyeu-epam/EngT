import { COLORS } from 'constants';
import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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

  const TooltipComponent = useMemo(() => (
    <Tooltip style={{ position: 'absolute' }}>{title}</Tooltip>
  ), [title, isCorrect]);

  return (
    <Container>
      {isActive ? (
        <OverlayTrigger
          overlay={TooltipComponent}
          show={checked && isIncorrect ? undefined : false}
        >
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
        </OverlayTrigger>
      ) : title}
    </Container>
  );
};

const Container = styled.div`
  margin-right: 5px;
`;

const DragPoints = styled.div`
  border: 1px solid ${COLORS.BORDER_COLOR};
  outline: 2px solid ${
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
  padding: 2px 10px;
  margin: 3px 0;
  min-width: 100px;
  transition: outline .3s;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    ${({ withHover }) => (withHover ? `outline: 2px solid ${COLORS.PRIMARY_COLOR};` : '')}
  }
`;

export default Word;

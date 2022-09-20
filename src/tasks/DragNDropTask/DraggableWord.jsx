import { COLORS } from 'constants';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const DraggableWord = ({
  word, inactive, onAnswerHandler, toggleActiveWord, activeWord,
  checked,
}) => {
  const [dragInProcess, setDragInProcess] = useState(false);

  useEffect(() => {
    setDragInProcess(false);
  }, [inactive]);

  const onDragStart = useCallback((e) => {
    if (inactive) return;
    toggleActiveWord();
    e.dataTransfer.setData('drag', JSON.stringify(word));
    setDragInProcess(true);
  }, [setDragInProcess, inactive, toggleActiveWord]);

  const onDragEnd = useCallback(() => {
    if (inactive) return;
    setDragInProcess(false);
  }, [setDragInProcess, inactive]);

  const onClick = useCallback(() => {
    if (checked) return;
    if (!inactive) {
      toggleActiveWord(word);
    } else {
      onAnswerHandler({
        questionId: word.questionId,
        wordId: word.id,
        userAnswer: word,
        isRemove: true,
      });
    }
  }, [inactive, word, onAnswerHandler, toggleActiveWord]);

  const withOutline = activeWord?.id === word.id;

  return (
    <Container>
      <Element
        draggable={!inactive && !checked}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={{ opacity: (inactive || dragInProcess) ? 0.2 : 1 }}
        inactive={inactive}
        onClick={onClick}
        withOutline={withOutline}
      >
        {word.title}
      </Element>
    </Container>
  );
};

const Container = styled.div`
  margin 5px 10px;
  border-radius: 7px;
`;
const Element = styled.div`
  border: 1px solid ${({ withOutline }) => (withOutline ? COLORS.PRIMARY_COLOR : COLORS.BORDER_COLOR)};
  ${({ withOutline }) => (withOutline
    ? `outline: 1px solid ${COLORS.PRIMARY_COLOR}`
    : '')};
  border-radius: 7px;
  padding: 0px 20px;
  cursor: ${({ inactive }) => (inactive ? 'pointer' : 'move')};
  background-color: ${COLORS.BACKGROUND_COLOR};
  transition: opacity .5s;
`;

export default DraggableWord;

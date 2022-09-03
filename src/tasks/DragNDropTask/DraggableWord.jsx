import { BACKGROUND_COLOR } from 'constants';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const DraggableWord = ({ word, inactive, onAnswerHandler }) => {
  const [opacity, setOpacity] = useState(1);

  const onDragStart = useCallback((e) => {
    if (inactive) return;
    e.dataTransfer.setData('drag', JSON.stringify(word));
    setOpacity(0.2);
  }, [setOpacity, inactive]);

  const onDragEnd = useCallback(() => {
    if (inactive) return;
    setOpacity(1);
  }, [setOpacity, inactive]);

  const onClick = useCallback(() => {
    if (!inactive) return;
    setOpacity(1);
    onAnswerHandler(word.questionId, word.id, word, true);
  }, [inactive, word, onAnswerHandler]);

  return (
    <Container>
      <Element
        draggable={!inactive}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={{ opacity: inactive ? 0.2 : opacity }}
        inactive={inactive}
        onClick={onClick}
      >
        {word.title}
      </Element>
    </Container>
  );
};

const Container = styled.div`
  margin 5px 10px;
  border-radius: 7px;
  overflow: hidden;
  opacity: 0.999
`;
const Element = styled.div`
  border: 2px solid #9FA6B2;
  border-radius: 7px;
  padding: 0px 10px;
  cursor: ${({ inactive }) => (inactive ? 'pointer' : 'move')};
  background-color: ${BACKGROUND_COLOR};
  transition: opacity .5s;
`;

export default DraggableWord;

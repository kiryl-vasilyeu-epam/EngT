import React from 'react';
import styled from 'styled-components';
import { some } from 'lodash';
import DraggableWord from './DraggableWord';

const DraggableWords = ({
  draggableWords,
  answers,
  onAnswerHandler,
}) => (
  <Container>
    {draggableWords.map((word) => (
      <DraggableWord
        key={word.id}
        word={word}
        inactive={some(answers, { id: word.id })}
        onAnswerHandler={onAnswerHandler}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 15px 0;
  border: 2px solid #9FA6B2;
  border-radius: 10px;
`;

export default DraggableWords;

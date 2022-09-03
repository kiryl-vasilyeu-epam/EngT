import React from 'react';
import styled from 'styled-components';
import { some } from 'lodash';
import { COLORS } from 'constants';
import DraggableWord from './DraggableWord';

const DraggableWords = ({
  draggableWords,
  answers,
  onAnswerHandler,
  toggleActiveWord,
  activeWord,
}) => (
  <Container>
    {draggableWords.map((word) => (
      <DraggableWord
        key={word.id}
        word={word}
        inactive={some(answers, { id: word.id })}
        onAnswerHandler={onAnswerHandler}
        toggleActiveWord={toggleActiveWord}
        activeWord={activeWord}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 15px 0;
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 10px;
`;

export default DraggableWords;

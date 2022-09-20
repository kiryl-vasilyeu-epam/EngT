import React from 'react';
import styled from 'styled-components';
import { some, sortBy } from 'lodash';
import { ColoredContainer } from 'components';
import DraggableWord from './DraggableWord';

const DraggableWords = ({
  draggableWords,
  answers,
  onAnswerHandler,
  toggleActiveWord,
  activeWord,
  checked,
}) => (
  <StickyContainer>
    <ColoredContainer correction={!checked && 'active'}>
      <Container>
        {sortBy(draggableWords, ['title']).map((word) => (
          <DraggableWord
            key={word.id}
            word={word}
            inactive={some(answers, { id: word.id })}
            onAnswerHandler={onAnswerHandler}
            toggleActiveWord={toggleActiveWord}
            activeWord={activeWord}
            checked={checked}
          />
        ))}
      </Container>
    </ColoredContainer>
  </StickyContainer>

);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export default DraggableWords;

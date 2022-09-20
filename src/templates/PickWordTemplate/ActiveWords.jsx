import React from 'react';
import styled from 'styled-components';
import Options from './Options';

const ActiveWords = ({
  activeWords, questionId, handleOptionsChange,
  addOption, deleteOption,
}) => (
  <Container>
    {activeWords.map((word) => (
      <Options
        word={word}
        key={word.id}
        questionId={questionId}
        handleOptionsChange={handleOptionsChange}
        addOption={addOption}
        deleteOption={deleteOption}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export default ActiveWords;

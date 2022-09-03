/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  RoundIconButton,
} from 'components';
import { COLORS } from 'constants';
import Option from './Option';

const Options = ({
  word, questionId, handleOptionsChange,
  addOption, deleteOption,
}) => {
  const { options } = word;

  const onAddOption = useCallback(() => {
    addOption(questionId, word.id);
  }, [questionId, word, addOption]);
  return (
    <Container>
      <TitleContainer>
        {word.title}
      </TitleContainer>
      <OptionsContainer>
        {options.map((option) => (
          <Option
            key={option.id}
            option={option}
            questionId={questionId}
            wordId={word.id}
            handleOptionsChange={handleOptionsChange}
            deleteOption={deleteOption}
          />
        ))}
        <RoundIconButton onClick={onAddOption} />
      </OptionsContainer>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 7px;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex: 1;
  align-items: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 51px;
  color: white;
  padding 0 20px;
  background: ${COLORS.PRIMARY_COLOR};
  border-radius: 7px;
  cursor: default;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`;

export default Options;

/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  ButtonText,
} from 'components';
import Card from 'react-bootstrap/Card';

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
    <Card>
      <Header>{word.title}</Header>

      <Card.Body>
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
          <ButtonText
            size="sm"
            title="Add option"
            onClick={onAddOption}
            outline
          />
        </OptionsContainer>
      </Card.Body>
    </Card>
  );
};

const Header = styled(Card.Header)`
  color: ${COLORS.PRIMARY_COLOR};
  font-weight: 500;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Options;

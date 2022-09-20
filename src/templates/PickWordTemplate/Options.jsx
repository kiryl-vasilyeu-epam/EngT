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
    <CardElement>
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
    </CardElement>
  );
};

const CardElement = styled(Card)`
  border: none;
  border-radius: 2px !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;

  /*Desktop Query*/
  @media only screen and (min-width: 768px) {
    margin: 15px 10px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    margin: 10px 0px;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    margin: 10px 0px;
  }
`;

const Header = styled(Card.Header)`
  background: ${COLORS.PRIMARY_COLOR};
  color: white;
  font-weight: 500;
  border-radius: 2px !important;
  font-size: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Options;

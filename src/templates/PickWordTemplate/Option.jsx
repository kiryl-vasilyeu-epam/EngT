import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  Input, ButtonText,
} from 'components';

const Option = ({
  option, questionId, wordId, handleOptionsChange, deleteOption,
}) => {
  const onTitleChange = useCallback((value) => {
    handleOptionsChange(questionId, wordId, option.id, { title: value });
  }, [option, questionId, wordId, handleOptionsChange]);

  const onDeletePress = useCallback(() => {
    deleteOption(questionId, wordId, option.id);
  }, [option, questionId, wordId, deleteOption]);

  return (
    <HorizontalContainer>
      <Margin>
        <Input
          value={option.title}
          onChange={onTitleChange}
          placeholder="Write an option"
        />
      </Margin>
      <ButtonText
        size="sm"
        title="Delete"
        onClick={onDeletePress}
        variant="danger"
        outline
      />
    </HorizontalContainer>
  );
};

const Margin = styled.div`
  flex: 1;
  margin-right: 30px;
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    margin-right: 0;
    margin-bottom: 10px;
    align-items: stretch;
    flex-direction: column;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    margin-right: 0;
    margin-bottom: 10px;
    align-items: stretch;
    flex-direction: column;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    align-items: stretch;
    flex-direction: column;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export default Option;

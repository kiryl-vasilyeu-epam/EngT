import React from 'react';
import styled from 'styled-components';
import { ColoredContainer } from 'components';
import { COLORS } from 'constants';

const QuestionContainer = ({
  correction,
  picture,
  index,
  children,
}) => (
  <ColoredContainer correction={correction}>
    {
      picture && (
        <ImageContainer>
          <Image src={picture} />
        </ImageContainer>
      )
    }
    <WordsContainer>
      <NumContainer>
        {`${index + 1}.`}
      </NumContainer>

      {children}
    </WordsContainer>
  </ColoredContainer>
);

const NumContainer = styled.div`
  padding-right: 5px;
  font-weight: 500;
`;

const ImageContainer = styled.div`
  outline: 1px solid ${COLORS.BORDER_COLOR};
  border-radius: 7px;
  width: 300px;
  height: 300px;
  margin: 15px;
`;
const Image = styled.img`
  object-fit: contain;
  width: 300px;
  height: 300px;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;
`;

export default QuestionContainer;

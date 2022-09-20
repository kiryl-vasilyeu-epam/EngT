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
    <RowContainer>
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
    </RowContainer>

  </ColoredContainer>
);

const NumContainer = styled.div`
  padding-right: 5px;
  font-weight: 500;
`;

const RowContainer = styled.div`
    display: flex;

    /*Mobile Query*/
    @media only screen and (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
    /*Tablet Query*/
    @media only screen and (min-width: 481px) and (max-width:780px) {
      flex-direction: column;
      align-items: center;
    }
`;

const ImageContainer = styled.div`
  outline: 1px solid ${COLORS.BORDER_COLOR};
  border-radius: 7px;
  margin: 15px;
  overflow: hidden;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 300px;
    height: 300px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 450px;
    height: 450px;
  }
`;

const Image = styled.img`
  object-fit: contain;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 300px;
    height: 300px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 450px;
    height: 450px;
  }
`;

const WordsContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  margin-left: 10px;
`;

export default QuestionContainer;

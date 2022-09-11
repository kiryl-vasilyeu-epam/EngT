import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ColoredContainer } from 'components';
import { filter } from 'lodash';
import { COLORS } from 'constants';
import { getCorrection } from '../helpers';

import Word from './Word';

const Question = ({
  question, checked, creator, onAnswerHandler, index,
}) => {
  const { words, id, picture } = question;
  let correction = null;
  const predicate = useCallback(
    ({ isActive, userAnswer, title }) => isActive && userAnswer === title,
    [],
  );
  const correctAnswersList = useMemo(
    () => filter(words, { isActive: true }),
    [words],
  );
  const userCorrectAnswersList = useMemo(
    () => filter(words, predicate),
    [words],
  );

  if (checked) {
    correction = getCorrection(correctAnswersList, userCorrectAnswersList);
  }

  return (
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

        {words.map((word) => (
          <Word
            key={word.id}
            word={word}
            onAnswerHandler={onAnswerHandler}
            questionId={id}
            creator={creator}
            checked={checked}
          />
        ))}
      </WordsContainer>
    </ColoredContainer>
  );
};

const ImageContainer = styled.div`
  outline: 1px solid ${COLORS.BORDER_COLOR};
  border-radius: 7px;
  width: 300px;
  height: 300px;
  margin: 15px;
  overflow: hidden;
`;
const Image = styled.img`
  object-fit: contain;
  width: 300px;
  height: 300px;
`;

const NumContainer = styled.div`
  padding-right: 5px;
  font-weight: 500;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;
`;

export default Question;

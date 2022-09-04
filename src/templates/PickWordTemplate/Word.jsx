import React, { useCallback, useMemo } from 'react';
import { ButtonText, RoundIconButton } from 'components';
import styled from 'styled-components';

const Word = ({
  word, toggleActive, divideWords, index: wordIndex,
}) => {
  const { title, isActive, id } = word;
  const onClickHandler = useCallback(() => {
    toggleActive(id);
  }, [word, toggleActive]);
  const words = title.split(' ');
  const onDivide = useCallback((index) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    divideWords(wordIndex, index);
  }, [title]);
  const titleElement = useMemo(() => (
    <Title>
      {words.map((wordPart, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TitleContainer key={`${id}_${index}`}>
          {wordPart}
          {index + 1 !== words.length && (
            <Margin>
              <RoundIconButton
                key={`plus_${word.id}`}
                onClick={onDivide(index)}
                variant="light"
                minus
                small
                href=""
              />
            </Margin>
          )}
        </TitleContainer>
      ))}
    </Title>
  ), [title, isActive]);

  return (
    <Container>
      <ButtonText
        outline={!isActive}
        onClick={onClickHandler}
        size="sm"
        title={titleElement}
      />
    </Container>

  );
};

const Container = styled.div`
  margin-right: 5px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Margin = styled.div`
  margin: 0 7px;
`;

export default Word;

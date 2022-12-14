import { RoundIconButton } from 'components';
import { NEW_LINE } from 'constants';
import { useUpdate } from 'hooks';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { generateWordsFromTitle, generateWordFromTitle, generateOption } from './helpers';

import Word from './Word';

const Words = ({
  title, words, handleWordsChange, questionId,
}) => {
  const toggleWord = useCallback((id) => {
    handleWordsChange(
      questionId,
      words.map((word) => {
        if (word.id === id) {
          return {
            ...word,
            isActive: !word.isActive,
            options: [generateOption(word.id)],
          };
        }
        return word;
      }),
    );
  }, [words, handleWordsChange]);

  const combineWords = useCallback((index) => () => {
    const leftWord = words[index];
    const rightWord = words[index + 1];
    const newWords = [...words];
    newWords.splice(index, 2, {
      ...leftWord,
      title: `${leftWord.title} ${rightWord.title}`,
      isActive: leftWord.isActive || rightWord.isActive,
      id: leftWord.id,
    });
    handleWordsChange(questionId, newWords);
  }, [words]);

  const divideWords = useCallback((wordIndex, divideIndex) => {
    const wordData = words[wordIndex];
    const wordsInTitle = wordData.title.split(' ');
    const leftTitle = wordsInTitle.slice(0, divideIndex + 1);
    const rightTitle = wordsInTitle.slice(divideIndex + 1);
    const newWords = [...words];
    newWords.splice(wordIndex, 1, {
      ...wordData,
      title: leftTitle.join(' '),
    }, generateWordFromTitle(rightTitle.join(' ')));

    handleWordsChange(questionId, newWords);
  }, [words, handleWordsChange]);

  useUpdate(() => {
    handleWordsChange(questionId, generateWordsFromTitle(title));
  }, [title]);

  return (
    <WordsContainer>
      {words.map((word, index) => (word.title === NEW_LINE ? null : (
        <Container key={word.id}>
          <Word
            index={index}
            word={word}
            toggleActive={toggleWord}
            divideWords={divideWords}
          />
          {index + 1 !== words.length && (
            <RoundIconButton
              onClick={combineWords(index)}
              small
            />
          )}
        </Container>
      )))}
    </WordsContainer>
  );
};

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  margin: 10px 0;
  border-radius: 7px;
  min-height: 49px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-right: 5px;
`;

export default Words;

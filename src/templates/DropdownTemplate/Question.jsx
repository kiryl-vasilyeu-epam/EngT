import { Input, IconButton } from 'components';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Words from './Words';
import ActiveWords from './ActiveWords';

const Question = ({
  question, deleteQuestion,
  handleQuestionChange, handleWordsChange, handleOptionsChange,
  addOption, deleteOption,
}) => {
  const { title, id, words } = question;

  const onDelete = useCallback(() => {
    deleteQuestion(id);
  }, [question, deleteQuestion]);

  const onTitleChange = useCallback((value) => {
    handleQuestionChange(id, value);
  }, [handleQuestionChange, question]);

  return (
    <Container>

      <QuestionContainer>
        <Subtitle>
          Question:
        </Subtitle>
        <Title>
          <Input
            value={title}
            placeholder="Enter correct sentence"
            onChange={onTitleChange}
          />
        </Title>
        <IconButton
          iconName="faTrashCan"
          onClick={onDelete}
        />
      </QuestionContainer>

      <WordsContainer>
        <Subtitle>
          Words:
        </Subtitle>
        <Words
          words={words}
          questionId={id}
          title={title}
          handleWordsChange={handleWordsChange}
        />
      </WordsContainer>

      <OptionsContainer>
        <Subtitle>
          Options:
        </Subtitle>
        <ActiveWords
          words={words}
          questionId={id}
          handleOptionsChange={handleOptionsChange}
          addOption={addOption}
          deleteOption={deleteOption}
        />
      </OptionsContainer>

    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #9FA6B2;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
`;

const Title = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const QuestionContainer = styled.div`
  flex: 1;
  display: flex;
  display: column;
  align-items: flex-start;
`;

const WordsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  align-items: flex-start;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0;
  width: 100px;
  min-height: 49px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

export default Question;

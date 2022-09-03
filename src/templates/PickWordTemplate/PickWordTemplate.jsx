import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { TemplateContainer, RoundIconButton } from 'components';
import { useTemplate } from 'hooks';
import { createQuestion, generateOption, getSettingsByType } from './helpers';
import Question from './Question';

const PickWordTemplate = ({ onSave, taskId, type }) => {
  const {
    setTitle,
    updateTemplate,
    template,
    handleSave,
  } = useTemplate({ onSave, taskId, type });
  const { questions, title } = template;
  const settings = useMemo(() => getSettingsByType(type), [type]);

  const addQuestion = useCallback(() => {
    updateTemplate({
      questions: [
        ...questions,
        createQuestion(),
      ],
    });
  }, [questions]);

  const deleteQuestion = useCallback((questionId) => {
    updateTemplate({
      questions: questions.filter(({ id }) => id !== questionId),
    });
  }, [questions]);

  const handleQuestionChange = useCallback((questionId, questionTitle) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        title: questionTitle,
      } : question)),
    });
  }, [questions]);

  const handleWordsChange = useCallback((questionId, words) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        words,
      } : question)),
    });
  }, [questions]);

  const handleOptionsChange = useCallback((questionId, wordId, optionId, data) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        words: question.words.map((word) => (word.id === wordId ? {
          ...word,
          options: word.options.map((option) => (option.id === optionId ? {
            ...option,
            ...data,
          } : option)),
        } : word)),
      } : question)),
    });
  }, [questions]);

  const addOption = useCallback((questionId, wordId) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        words: question.words.map((word) => (word.id === wordId ? {
          ...word,
          options: [
            ...word.options,
            generateOption(word.id),
          ],
        } : word)),
      } : question)),
    });
  }, [questions]);

  const deleteOption = useCallback((questionId, wordId, optionId) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        words: question.words.map((word) => (word.id === wordId ? {
          ...word,
          options: word.options.filter(({ id }) => id !== optionId),
        } : word)),
      } : question)),
    });
  }, [questions]);

  return (
    <TemplateContainer
      handleSave={handleSave}
      title={title}
      setTitle={setTitle}
    >
      <Container>
        {questions?.map((question) => (
          <Question
            key={question.id}
            question={question}
            deleteQuestion={deleteQuestion}
            handleQuestionChange={handleQuestionChange}
            handleWordsChange={handleWordsChange}
            handleOptionsChange={handleOptionsChange}
            addOption={addOption}
            deleteOption={deleteOption}
            settings={settings}
          />
        ))}
      </Container>

      <ButtonContainer>
        <RoundIconButton onClick={addQuestion} />
      </ButtonContainer>
    </TemplateContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid #9FA6B2;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
`;

export default PickWordTemplate;

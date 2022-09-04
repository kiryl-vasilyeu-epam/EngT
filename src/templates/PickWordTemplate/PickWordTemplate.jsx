import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { TemplateContainer } from 'components';
import { useTemplate } from 'hooks';
import { createQuestion, generateOption, getSettingsByType } from './helpers';
import Question from './Question';

const PickWordTemplate = ({ onSave, taskId, type }) => {
  const {
    setTitle,
    updateTemplate,
    template,
    handleSave,
    addMedia,
    setMedia,
    deleteMedia,
  } = useTemplate({ onSave, taskId, type });
  const { questions, title, media } = template;
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
      addMedia={addMedia}
      media={media}
      setMedia={setMedia}
      deleteMedia={deleteMedia}
      addQuestion={addQuestion}
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
    </TemplateContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PickWordTemplate;

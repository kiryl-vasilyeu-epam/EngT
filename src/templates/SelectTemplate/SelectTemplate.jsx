import React, { useCallback } from 'react';
import { TemplateContainer } from 'components';
import { filter } from 'lodash';

import { SELECT_TEMPLATE } from 'constants';

import { useTemplate } from 'hooks';
import Question from './Question';
import { createQuestion, createAnswer } from './helpers';

const SelectTemplate = ({ onSave, taskId }) => {
  const {
    setTitle,
    updateTemplate,
    template,
    handleSave,
    addMedia,
    setMedia,
    deleteMedia,
  } = useTemplate({
    onSave,
    taskId,
    type: SELECT_TEMPLATE,
  });

  const {
    title, questions, media,
  } = template;

  const handleQuestionChange = useCallback((questionId, questionTitle) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        title: questionTitle,
      } : question)),
    });
  }, [questions]);

  const handleAnswerChange = useCallback((questionId, answerId, answerChanges) => {
    updateTemplate({
      questions: questions.map((question) => (question.id === questionId ? {
        ...question,
        multiline: !!filter(question.answers, { isCorrect: true }).length,
        answers: question.answers.map(
          (answer) => (answer.id === answerId ? {
            ...answer,
            ...answerChanges,
          } : answer),
        ),
      } : question)),
    });
  }, [questions]);

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

  const addAnswer = useCallback((questionId) => {
    updateTemplate({
      questions: questions.map(
        (question) => (question.id === questionId ? ({
          ...question,
          answers: [
            ...question.answers,
            createAnswer(),
          ],
        }) : question),
      ),
    });
  }, [questions]);

  const deleteAnswer = useCallback((questionId, answerId) => {
    updateTemplate({
      questions: questions.map(
        (question) => (question.id === questionId ? ({
          ...question,
          answers: question.answers.filter(({ id }) => answerId !== id),
        }) : question),
      ),
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
      {questions?.map((questionData, index) => (
        <Question
          key={questionData.id}
          index={index}
          questionData={questionData}
          handleQuestionChange={handleQuestionChange}
          handleAnswerChange={handleAnswerChange}
          addAnswer={addAnswer}
          deleteAnswer={deleteAnswer}
          deleteQuestion={deleteQuestion}
        />
      ))}

    </TemplateContainer>
  );
};

export default SelectTemplate;

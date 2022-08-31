import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
  RoundIconButton, TemplateContainer,
} from 'components';
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
  } = useTemplate({
    onSave,
    taskId,
    type: SELECT_TEMPLATE,
  });

  const {
    title, questions,
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
    >
      {questions.map((questionData, index) => (
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

      <ButtonContainer>
        <RoundIconButton onClick={addQuestion} />
      </ButtonContainer>
    </TemplateContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
`;

export default SelectTemplate;

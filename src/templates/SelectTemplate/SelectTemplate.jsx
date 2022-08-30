import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  Input, RoundIconButton, ButtonText,
} from 'components';
import { filter } from 'lodash';

import { SELECT_TEMPLATE } from 'constants';
import {
  addTask, initTemplate, deleteTemplate, modifyTemplate,
} from 'store';
import { Row } from './common';
import Question from './Question';
import { createQuestion, createAnswer } from './helpers';

const SelectTemplate = ({ onSave }) => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.template);

  useEffect(() => {
    dispatch(initTemplate(SELECT_TEMPLATE));
    return () => {
      dispatch(deleteTemplate());
    };
  }, []);

  const {
    title, questions,
  } = template;

  const updateTemplate = useCallback((...args) => {
    dispatch(modifyTemplate(...args));
  }, [dispatch, modifyTemplate]);

  const setTitle = useCallback((templateTitle) => {
    updateTemplate({ title: templateTitle });
  }, []);

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

  const handleSave = useCallback(() => {
    dispatch(addTask(template));
    onSave();
    dispatch(deleteTemplate());
  }, [template]);

  return (
    <>
      <Container>

        <Row>
          <Title>Exercise Title:</Title>
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter lesson title"
          />
        </Row>

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

      </Container>

      <ButtonText
        title="Save"
        onClick={handleSave}
        primary
        withoutRadius
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
`;

export default SelectTemplate;

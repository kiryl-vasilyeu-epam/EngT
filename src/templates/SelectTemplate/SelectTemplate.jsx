/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import { compact } from 'lodash';

import { useDispatch } from 'react-redux';
import {
  Input, RoundIconButton, ButtonText,
} from 'components';

import { SELECT_TEMPLATE } from 'constants';
import { addTask } from 'store';
import { Row } from './common';
import Question from './Question';

const answerTemplate = {
  title: '', isCorrect: false,
};
const questionTemplate = {
  question: '',
  answers: [answerTemplate],
};

const SelectTemplate = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([questionTemplate]);
  const dispatch = useDispatch();

  const handleQuestionChange = (index) => (value) => {
    setQuestions((stateQuestions) => stateQuestions.map((questionData, ind) => {
      if (index === ind) {
        return {
          ...questionData,
          question: value,
        };
      }

      return questionData;
    }));
  };

  const handleAnswerChange = (index, answerIndex) => (value) => {
    setQuestions((stateQuestions) => stateQuestions.map((questionData, ind) => {
      if (index === ind) {
        return {
          ...questionData,
          answers: questionData.answers.map((answer, answerInd) => {
            if (answerIndex === answerInd) {
              return {
                ...answer,
                title: value,
              };
            }

            return answer;
          }),
        };
      }

      return questionData;
    }));
  };

  const handleCorrectionChange = (index, answerIndex) => (value) => {
    setQuestions((stateQuestions) => stateQuestions.map((questionData, ind) => {
      if (index === ind) {
        return {
          ...questionData,
          answers: questionData.answers.map((answer, answerInd) => {
            if (answerIndex === answerInd) {
              return {
                ...answer,
                isCorrect: value,
              };
            }

            return answer;
          }),
        };
      }

      return questionData;
    }));
  };

  const addQuestion = () => {
    setQuestions((state) => [...state, questionTemplate]);
  };

  const deleteQuestion = (index) => () => {
    setQuestions((stateQuestions) => compact(
      stateQuestions.map((questionData, ind) => (index === ind ? null : questionData)),
    ));
  };

  const addAnswer = (questionIndex) => () => {
    setQuestions((stateQuestions) => stateQuestions.map((questionData, index) => {
      if (index === questionIndex) {
        return {
          ...questionData,
          answers: [
            ...questionData.answers,
            answerTemplate,
          ],
        };
      }

      return questionData;
    }));
  };

  const deleteAnswer = (questionIndex, answerIndex) => () => {
    setQuestions((stateQuestions) => stateQuestions.map((questionData, index) => {
      if (index === questionIndex) {
        return {
          ...questionData,
          answers: compact(
            questionData.answers.map((answer, ind) => (answerIndex === ind ? null : answer)),
          ),
        };
      }

      return questionData;
    }));
  };

  const handleSave = () => {
    const task = {
      type: SELECT_TEMPLATE,
      title,
      questions,
    };

    dispatch(addTask(task));
    onSave();
  };

  return (
    <>
      <Container>

        <Row>
          <Title>Exercise Title:</Title>
          <Input value={title} onChange={setTitle} placeholder="Enter lesson title" />
        </Row>

        {questions.map((questionData, index) => (
          <Question
            key={`question_${index}`}
            index={index}
            questionData={questionData}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            handleCorrectionChange={handleCorrectionChange}
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

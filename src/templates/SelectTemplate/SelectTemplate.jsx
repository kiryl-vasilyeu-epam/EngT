/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import { compact } from 'lodash';

import Input from '../../components/Input/Input';
import RoundIconButton from '../../components/RoundIconButton/RoundIconButton';
import LastScrollElement from '../../components/LastScrollElement/LastScrollElement';

import { Row, ButtonContainer } from './common';
import Question from './Question';

const answerTemplate = {
  title: '', isCorrect: false,
};
const questionTemplate = {
  question: '',
  answers: [answerTemplate],
};

const SelectTemplate = () => {
  const [title, setTitle] = useState('Some long titles that I don\'t know');
  const [questions, setQuestions] = useState([questionTemplate]);

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

  return (
    <Container>

      <Row>
        <Title>Exercise Title:</Title>
        <Input value={title} onChange={setTitle} />
      </Row>

      {
        questions.map((questionData, index) => (
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
        ))
      }

      <ButtonContainer>
        <RoundIconButton onClick={addQuestion} />
      </ButtonContainer>

      <LastScrollElement />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
`;

export default SelectTemplate;

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { updateUserAnswer } from 'store';
import Question from './Question';
import Title from './Title';

const SelectTask = ({
  task,
  creator,
  checked,
  modalId,
}) => {
  const {
    id, questions, title, type,
  } = task;

  const dispatch = useDispatch();

  const onAnswerHandler = (questionId, answerId, userAnswer) => {
    if (checked || creator) return;

    dispatch(updateUserAnswer({
      taskId: id,
      userAnswer: {
        ...task,
        questions: task.questions.map((question) => (
          question.id === questionId
            ? {
              ...question,
              answers: question.answers.map((answer) => {
                if (answer.id === answerId) {
                  return {
                    ...answer,
                    userAnswer,
                  };
                } if (!question.multiline) {
                  return {
                    ...answer,
                    userAnswer: false,
                  };
                }
                return answer;
              }),
            } : question
        )),
      },
    }));
  };

  return (
    <Container>
      <Title
        id={id}
        modalId={modalId}
        title={title}
        creator={creator}
        type={type}
      />
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          checked={checked}
          creator={creator}
          index={index}
          onAnswerHandler={onAnswerHandler}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
  border: 2px solid #9FA6B2;
  border-radius: 8px;
  padding: 20px;
`;

export default SelectTask;

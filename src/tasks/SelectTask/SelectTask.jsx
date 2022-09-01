import React from 'react';
import { useDispatch } from 'react-redux';

import { updateUserAnswer } from 'store';
import Question from './Question';
import { Title, TaskContainer } from '../components';

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
    <TaskContainer>
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
    </TaskContainer>
  );
};

export default SelectTask;

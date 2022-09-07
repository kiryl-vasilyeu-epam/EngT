import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateUserAnswer, setChecked } from 'store';
import Question from './Question';
import { TaskContainer } from '../components';

const SelectTask = ({
  task,
  creator,
  modalId,
}) => {
  const {
    id, questions, title, type, media, checked, userScore,
  } = task;

  const dispatch = useDispatch();

  const onAnswerHandler = useCallback((questionId, answerId, userAnswer) => {
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
  }, [task, creator]);

  const onCheckHandler = useCallback(() => {
    dispatch(setChecked(id));
  }, [id]);

  return (
    <TaskContainer
      id={id}
      modalId={modalId}
      title={title}
      creator={creator}
      type={type}
      media={media}
      checked={checked}
      setChecked={onCheckHandler}
      userScore={userScore}
    >
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

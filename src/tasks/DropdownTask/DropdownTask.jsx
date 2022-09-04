import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAnswer } from 'store';
import { TaskContainer } from '../components';
import Question from './Question';

const DropdownTask = ({
  task,
  creator,
  checked,
  modalId,
}) => {
  const {
    id, questions, title, type, media,
  } = task;

  const dispatch = useDispatch();

  const onAnswerHandler = (questionId, wordId, userAnswer) => {
    if (checked || creator) return;

    dispatch(updateUserAnswer({
      taskId: id,
      userAnswer: {
        ...task,
        questions: task.questions.map((question) => (
          question.id === questionId
            ? {
              ...question,
              words: question.words.map((word) => {
                if (word.id === wordId) {
                  return {
                    ...word,
                    userAnswer,
                  };
                }
                return word;
              }),
            } : question
        )),
      },
    }));
  };

  return (
    <TaskContainer
      id={id}
      modalId={modalId}
      title={title}
      creator={creator}
      type={type}
      media={media}
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

export default DropdownTask;

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAnswer, setChecked } from 'store';
import { TaskContainer } from '../components';
import Question from './Question';

const DropdownTask = ({
  task,
  creator,
  modalId,
  viewOnly,
}) => {
  const {
    id, questions, title, type, media, checked, userScore,
  } = task;

  const dispatch = useDispatch();

  const onAnswerHandler = useCallback((questionId, wordId, userAnswer) => {
    if (checked || creator || viewOnly) return;

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
  }, [checked, creator, task, viewOnly]);

  const onCheckHandler = useCallback(() => {
    if (viewOnly) return;
    dispatch(setChecked(id));
  }, [id, viewOnly]);

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
      viewOnly={viewOnly}
    >
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          checked={checked}
          creator={creator}
          index={index}
          onAnswerHandler={onAnswerHandler}
          viewOnly={viewOnly}
        />
      ))}
    </TaskContainer>
  );
};

export default DropdownTask;

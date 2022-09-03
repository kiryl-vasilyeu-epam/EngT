import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAnswer } from 'store';
import { xorBy } from 'lodash';
import { Title, TaskContainer } from '../components';
import Question from './Question';
import DraggableWords from './DraggableWords';
import { getDraggableWords } from './helpers';

const DragNDropTask = ({
  task,
  creator,
  checked,
  modalId,
}) => {
  const {
    id, questions, title, type, answers,
  } = task;

  const dispatch = useDispatch();

  const onAnswerHandler = (questionId, wordId, userAnswer, isRemove) => {
    if (checked || creator) return;

    dispatch(updateUserAnswer({
      taskId: id,
      userAnswer: {
        ...task,
        answers: xorBy(task?.answers, [userAnswer], 'id'),
        questions: task.questions.map((question) => (
          question.id === questionId
            ? {
              ...question,
              words: question.words.map((word) => {
                if (word.id === wordId) {
                  return {
                    ...word,
                    userAnswer: isRemove ? {} : userAnswer,
                  };
                }
                return word;
              }),
            } : question
        )),
      },
    }));
  };

  const draggableWords = useMemo(() => getDraggableWords(questions), [questions]);

  return (
    <TaskContainer>
      <Title
        id={id}
        modalId={modalId}
        title={title}
        creator={creator}
        type={type}
      />
      <DraggableWords
        draggableWords={draggableWords}
        answers={answers}
        onAnswerHandler={onAnswerHandler}
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

export default DragNDropTask;

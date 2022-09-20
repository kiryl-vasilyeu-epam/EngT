import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAnswer, setChecked } from 'store';
import { xorBy } from 'lodash';
import { TaskContainer } from '../components';
import Question from './Question';
import DraggableWords from './DraggableWords';
import { getDraggableWords } from './helpers';

const DragNDropTask = ({
  task,
  creator,
  modalId,
  viewOnly,
}) => {
  const {
    id, questions, title, type, answers, media, checked, userScore,
  } = task;

  const [activeWord, setActiveWord] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveWord(null);
  }, [checked, setActiveWord]);

  const onAnswerHandler = useCallback(({
    questionId,
    wordId,
    userAnswer,
    currentUserAnswer,
    isRemove,
  }) => {
    if (checked || creator || viewOnly) return;

    setActiveWord(null);
    dispatch(updateUserAnswer({
      taskId: id,
      userAnswer: {
        ...task,
        answers: xorBy(task?.answers, [userAnswer, currentUserAnswer], 'id'),
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
  }, [task, creator, setActiveWord, viewOnly]);

  const onCheckHandler = useCallback(() => {
    if (viewOnly) return;
    dispatch(setChecked(id));
  }, [id, viewOnly]);

  const draggableWords = useMemo(() => getDraggableWords(questions), [questions]);

  const toggleActiveWord = useCallback((word) => {
    setActiveWord((active) => {
      if (!word || active?.id === word.id) {
        return null;
      }
      return word;
    });
  }, [setActiveWord]);

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
      {!!draggableWords.length && !creator && !viewOnly && (
        <DraggableWords
          draggableWords={draggableWords}
          answers={answers}
          onAnswerHandler={onAnswerHandler}
          toggleActiveWord={toggleActiveWord}
          activeWord={activeWord}
          checked={checked}
        />
      )}
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          checked={checked}
          creator={creator}
          index={index}
          onAnswerHandler={onAnswerHandler}
          activeWord={activeWord}
          viewOnly={viewOnly}
        />
      ))}
    </TaskContainer>
  );
};

export default DragNDropTask;

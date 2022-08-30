import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'lodash';
import {
  RadioButton,
  Checkbox,
  IconButton,
} from 'components';

import { removeTask } from 'store';

const SelectTask = ({
  task,
  creator,
  checked,
}) => {
  const { id, questions, title } = task;
  const [userAnswers, setUserAnswers] = useState(
    () => questions.map(
      ({ answers }) => answers.map(
        () => false,
      ),
    ),
  );

  const dispatch = useDispatch();

  const onCheckboxHandler = (questionIndex, answerIndex) => (value) => {
    if (checked || creator) return;

    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((answer, aIndex) => {
        if (aIndex !== answerIndex) return answer;
        return value;
      });
    }));
  };

  const onRadioHandler = (questionIndex, answerIndex) => () => {
    if (checked || creator) return;

    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((_a, aIndex) => aIndex === answerIndex);
    }));
  };

  const onDeleteTaskHandler = useCallback(() => {
    dispatch(removeTask(id));
  }, [id]);

  return (
    <Container>

      <Title>
        {title}
        {creator && (
          <CreatorButtons>
            <IconButton
              iconName="faPen"
              onClick={onDeleteTaskHandler}
            />
            <IconButton
              iconName="faTrash"
              onClick={onDeleteTaskHandler}
            />
          </CreatorButtons>

        )}
      </Title>

      {
        questions.map(({
          title: questionTitle, id: questionId, answers, multiline,
        }, index) => {
          let correction = null;
          const predicate = ({ isCorrect }, answerIndex) => {
            const userAnswer = userAnswers?.[index]?.[answerIndex];
            return userAnswer && userAnswer === isCorrect;
          };

          const correctAnswersList = filter(answers, { isCorrect: true });
          const userCorrectAnswersList = filter(answers, predicate);

          if (checked) {
            if (correctAnswersList.length === userCorrectAnswersList.length) {
              correction = 'correct';
            } else if (userCorrectAnswersList.length > 0) {
              correction = 'partially';
            } else {
              correction = 'incorrect';
            }
          }

          return (
            <Question key={questionId} correction={correction}>
              <Subtitle>{`${index + 1}. ${questionTitle}`}</Subtitle>
              <AnswerContainer>
                {
                  answers.map(({ title: answerTitle, id: answerId }, answerIndex) => {
                    const userAnswer = userAnswers?.[index]?.[answerIndex];
                    const correctAnswer = questions?.[index]?.answers?.[answerIndex].isCorrect;
                    const isActiveByUser = checked ? (userAnswer || correctAnswer) : userAnswer;
                    const isActive = creator
                      ? correctAnswer
                      : isActiveByUser;
                    const isUserCorrectAnswer = userAnswer === correctAnswer;
                    const isShowResult = checked && (userAnswer || correctAnswer);
                    const correctionColor = creator || (checked && correctAnswer);
                    const withOpacity = checked && correctAnswer && !userAnswer;

                    return (
                      <Answer key={answerId}>
                        <IconContainer correct={isUserCorrectAnswer}>
                          {isShowResult && (isUserCorrectAnswer ? (
                            <FontAwesomeIcon icon={faCheck} />

                          ) : (
                            <FontAwesomeIcon icon={faXmark} />
                          ))}
                        </IconContainer>

                        {
                          multiline ? (
                            <Checkbox
                              checked={isActive}
                              onChange={onCheckboxHandler(index, answerIndex)}
                              correct={correctionColor}
                              withOpacity={withOpacity}
                            />
                          ) : (
                            <RadioButton
                              checked={isActive}
                              onChange={onRadioHandler(index, answerIndex)}
                              correct={correctionColor}
                              withOpacity={withOpacity}
                            />
                          )
                        }
                        <Text>
                          {answerTitle}
                        </Text>
                      </Answer>
                    );
                  })
                }
              </AnswerContainer>
            </Question>
          );
        })
      }

    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Subtitle = styled.div`
  font-size: 25px;
`;

const Question = styled.div`
  padding: 10px;
  margin: 15px 0;
  border: 4px solid ${({ correction }) => {
    if (correction === 'correct') {
      return 'limegreen';
    } if (correction === 'partially') {
      return 'rgb(250, 210, 0)';
    } if (correction === 'incorrect') {
      return 'red';
    }
    return 'rgba(0, 0, 0, 0.1)';
  }};
  border-radius: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
`;

const Text = styled.div`
  margin-left: 16px;
`;

const IconContainer = styled.div`
  width: 30px;
  font-size: 25px;
  color: ${({ correct }) => (correct ? 'limegreen' : 'red')}
`;
const CreatorButtons = styled.div`
  display: flex;
`;

export default SelectTask;

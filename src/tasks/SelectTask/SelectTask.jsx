/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import RadioButton from '../../components/RadioButton/RadioButton';
import Checkbox from '../../components/Checkbox/Checkbox';
import IconButton from '../../components/IconButton/IconButton';
import { tasksSlice } from '../../store/tasksSlice';

const SelectTask = ({
  title, questions, creator, index: taskIndex,
}) => {
  const [userAnswers, setUserAnswers] = useState(
    () => questions.map(
      ({ answers }) => answers.map(
        () => false,
      ),
    ),
  );

  const dispatch = useDispatch();

  const onCheckboxHandler = (questionIndex, answerIndex) => (value) => {
    if (creator) return;

    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((answer, aIndex) => {
        if (aIndex !== answerIndex) return answer;
        return value;
      });
    }));
  };

  const onRadioHandler = (questionIndex, answerIndex) => () => {
    if (creator) return;

    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((_a, aIndex) => aIndex === answerIndex);
    }));
  };

  const onDeleteTaskHandler = useCallback(() => {
    dispatch(tasksSlice.actions.removeTask(taskIndex));
  }, [taskIndex]);

  return (
    <Container>

      <Title>
        {title}
        {creator && (
          <IconButton
            iconName="faTrash"
            onClick={onDeleteTaskHandler}
          />
        )}
      </Title>

      {
        questions.map(({ question, answers, multiline }, index) => (
          <Question key={`question_${index}`}>
            <Subtitle>{`${index + 1}. ${question}`}</Subtitle>
            <AnswerContainer>
              {
                answers.map(({ title: answerTitle }, answerIndex) => {
                  const isChecked = creator
                    ? questions?.[index]?.answers?.[answerIndex].isCorrect
                    : userAnswers?.[index]?.[answerIndex];
                  return (
                    <Answer key={`answer_${index}_${answerIndex}`}>
                      {
                        multiline ? (
                          <Checkbox
                            checked={isChecked}
                            onChange={onCheckboxHandler(index, answerIndex)}
                            correct={creator}
                          />
                        ) : (
                          <RadioButton
                            checked={isChecked}
                            onChange={onRadioHandler(index, answerIndex)}
                            correct={creator}
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
        ))
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
  margin: 10px 0;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding-left: 26px;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  padding-left: 26px;
`;

const Text = styled.div`
  margin-left: 16px;
`;

export default SelectTask;

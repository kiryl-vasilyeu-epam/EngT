/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import RadioButton from '../../components/RadioButton/RadioButton';
import Checkbox from '../../components/Checkbox/Checkbox';

const SelectTask = ({ title, questions }) => {
  const [userAnswers, setUserAnswers] = useState(
    () => questions.map(
      ({ answers }) => answers.map(
        () => false,
      ),
    ),
  );

  const onCheckboxHandler = (questionIndex, answerIndex) => (value) => {
    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((answer, aIndex) => {
        if (aIndex !== answerIndex) return answer;
        return value;
      });
    }));
  };

  const onRadioHandler = (questionIndex, answerIndex) => () => {
    setUserAnswers((state) => state.map((question, qIndex) => {
      if (qIndex !== questionIndex) return question;

      return question.map((_a, aIndex) => aIndex === answerIndex);
    }));
  };

  return (
    <Container>

      <Title>
        {title}
      </Title>

      {
        questions.map(({ question, answers, multiline }, index) => (
          <Question key={`question_${index}`}>
            <Subtitle>{`${index + 1}. ${question}`}</Subtitle>
            <AnswerContainer>
              {
                  answers.map(({ title: answerTitle }, answerIndex) => (
                    <Answer key={`answer_${index}_${answerIndex}`}>
                      {
                        multiline ? (
                          <Checkbox
                            checked={userAnswers[index][answerIndex]}
                            onChange={onCheckboxHandler(index, answerIndex)}
                          />
                        ) : (
                          <RadioButton
                            checked={userAnswers[index][answerIndex]}
                            onChange={onRadioHandler(index, answerIndex)}
                          />
                        )
                      }
                      <Text>
                        {answerTitle}
                      </Text>
                    </Answer>
                  ))
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

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const DropdownTask = ({
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
      DropdownTask
    </Container>
  );
};

const Container = styled.div`
  border: 5px solid red;
`;

export default DropdownTask;

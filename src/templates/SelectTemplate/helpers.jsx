import { uniqueId } from 'lodash';

export const createAnswer = (questionId) => ({
  title: '',
  isCorrect: true,
  id: uniqueId(`template_q${questionId}_answer_`),
});

export const createQuestion = () => {
  const id = uniqueId('template_question_');

  return {
    title: '',
    multiline: false,
    answers: [
      createAnswer(id),
    ],
    id,
  };
};

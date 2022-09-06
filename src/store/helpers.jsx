import {
  SELECT_TEMPLATE, FILL_TEMPLATE, DRAG_N_DROP_TEMPLATE, DROPDOWN_TEMPLATE,
} from 'constants';

const countByType = {
  wordPick: (task) => {
    let taskScore = 0;
    let questions = 0;

    task.questions.forEach(({ words }) => {
      words.forEach(({ isActive, title, userAnswer }) => {
        if (isActive) {
          questions += 1;
          if (title === (userAnswer?.title || userAnswer)) {
            taskScore += 1;
          }
        }
      });
    });
    return {
      taskScore, questions,
    };
  },
  [DRAG_N_DROP_TEMPLATE]: (task) => countByType.wordPick(task),
  [DROPDOWN_TEMPLATE]: (task) => countByType.wordPick(task),
  [FILL_TEMPLATE]: (task) => countByType.wordPick(task),
  [SELECT_TEMPLATE]: (task) => {
    let taskScore = 0;
    let questions = 0;

    task.questions.forEach(({ answers }) => {
      let questionScore = 0;
      answers.forEach(({ isCorrect, userAnswer }) => {
        if (isCorrect) {
          questions += 1;
          if (userAnswer) {
            questionScore += 1;
          }
        } else if (userAnswer) {
          questionScore -= 1;
        }
      });
      taskScore += questionScore >= 0 ? questionScore : 0;
    });
    return {
      taskScore, questions,
    };
  },
};

export const getScore = (tasks) => {
  let userScore = 0;
  let questionsCount = 0;

  tasks.forEach((task) => {
    const { taskScore, questions } = countByType[task.type](task);

    userScore += taskScore;
    questionsCount += questions;
  });

  return +((userScore / questionsCount) * 10).toFixed(1) || 10;
};

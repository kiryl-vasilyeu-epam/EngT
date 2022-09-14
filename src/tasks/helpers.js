export const getCorrection = (correctAnswersList, userCorrectAnswersList, allAnswers) => {
  let correction = null;

  const hasIncorrectAnswers = allAnswers
    ? allAnswers.length !== userCorrectAnswersList.length
    : false;
  if (!hasIncorrectAnswers && correctAnswersList.length === userCorrectAnswersList.length) {
    correction = 'correct';
  } else if (userCorrectAnswersList.length > 0) {
    correction = 'partially';
  } else {
    correction = 'incorrect';
  }

  return correction;
};

export const normalizeString = (string = '') => {
  const punctuation = string.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  const spaces = punctuation.replace(/\s{2,}/g, ' ');
  return spaces.toLowerCase().trim();
};

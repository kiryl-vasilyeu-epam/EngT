export const getCorrection = (correctAnswersList, userCorrectAnswersList) => {
  let correction = null;

  if (correctAnswersList.length === userCorrectAnswersList.length) {
    correction = 'correct';
  } else if (userCorrectAnswersList.length > 0) {
    correction = 'partially';
  } else {
    correction = 'incorrect';
  }

  return correction;
};

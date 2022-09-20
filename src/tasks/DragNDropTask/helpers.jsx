export const getDraggableWords = (questions) => {
  const draggableWords = [];

  questions.forEach((question) => {
    question.words.forEach((word) => {
      if (word.isActive) {
        draggableWords.push({
          ...word,
          questionId: question.id,
        });
      }
    });
  });

  return draggableWords;
};

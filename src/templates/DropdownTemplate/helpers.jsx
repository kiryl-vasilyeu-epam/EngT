import { uniqueId } from 'lodash';

export const createQuestion = () => {
  const id = uniqueId('template_question_');

  return {
    title: '',
    multiline: false,
    words: [],
    id,
  };
};

export const generateOption = (id) => ({
  title: '',
  id: uniqueId(`option_${id}`),
});

export const generateWordFromTitle = (title) => {
  const id = uniqueId('template_word');
  return {
    title,
    isActive: false,
    id,
    options: [generateOption(id)],
  };
};

export const generateWordsFromTitle = (title) => title.split(' ')
  .filter((text) => !!text)
  .map(((word) => generateWordFromTitle(word)));

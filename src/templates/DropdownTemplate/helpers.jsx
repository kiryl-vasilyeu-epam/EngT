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

export const generateWordFromTitle = (title) => ({
  title,
  isActive: false,
  id: uniqueId('template_word'),
  options: [generateOption()],
});

export const generateWordsFromTitle = (title) => title.split(' ')
  .filter((text) => !!text)
  .map(((word) => generateWordFromTitle(word)));

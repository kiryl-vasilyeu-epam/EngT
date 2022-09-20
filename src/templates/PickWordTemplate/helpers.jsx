import {
  NEW_LINE,
  DRAG_N_DROP_TEMPLATE,
  DROPDOWN_TEMPLATE,
  FILL_TEMPLATE,
} from 'constants';
import { uniqueId } from 'lodash';

export const createQuestion = () => {
  const id = uniqueId('template_question_');

  return {
    title: '',
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
    title: title.trim(),
    isActive: false,
    id,
    options: [generateOption(id)],
  };
};

export const generateWordsFromTitle = (title) => title.replace(/(?:\r\n|\r|\n)/g, ` ${NEW_LINE} `)
  .split(' ')
  .filter((text) => !!text)
  .map(((word) => generateWordFromTitle(word)));

const PICK_SETTINGS = {
  [DROPDOWN_TEMPLATE]: {
    withOptions: true,
  },
  [DRAG_N_DROP_TEMPLATE]: {
    withOptions: false,
  },
  [FILL_TEMPLATE]: {
    withOptions: false,
  },
};

export const getSettingsByType = (type) => PICK_SETTINGS[type];

export const SELECT_TEMPLATE = 'SELECT_TEMPLATE';
export const DROPDOWN_TEMPLATE = 'DROPDOWN_TEMPLATE';
export const DRAG_N_DROP_TEMPLATE = 'DRAG_N_DROP_TEMPLATE';
export const FILL_TEMPLATE = 'FILL_TEMPLATE';

export const TEMPLATES_LIST = [
  { type: SELECT_TEMPLATE, name: 'Select and multiselect template' },
  { type: DROPDOWN_TEMPLATE, name: 'Dropdown template' },
  { type: DRAG_N_DROP_TEMPLATE, name: 'Drag\'n\'drop template' },
  { type: FILL_TEMPLATE, name: 'Fill the word template' },
];

export const COLORS = {
  BACKGROUND_COLOR: '#FBFBFB',
  BORDER_COLOR: '#9FA6B2',
  PRIMARY_COLOR: '#2962FF',
  SUCCESS_COLOR: '#14A44D',
  WARNING_COLOR: '#E4A11B',
  ERROR_COLOR: '#DC4C64',
};

export const NAVIGATION_ROUTES = [
  { path: '/', creator: false, name: 'Tasks' },
  { path: '/templates', creator: true, name: 'Templates' },
];

export const LOCAL_STORAGE_KEYS = {
  LESSON_ID: 'LESSON_ID',
  USER_ANSWERS: 'USER_ANSWERS',
  CHECKED: 'CHECKED',
};

export const OKTO_TOKEN = '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';

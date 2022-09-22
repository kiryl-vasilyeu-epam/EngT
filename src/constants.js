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
  BG_GRADIENT: 'linear-gradient(133deg, rgba(250,250,250,1) 0%, rgba(231,241,254,1) 50%);',
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
  USERNAME: 'USERNAME',
  GROUP: 'GROUP',
};

export const OKTO_TOKEN = `${
  '76TAvZW3BcZk0DClW_phg'.split('').reverse().join('')
}${
  '1w3Vd2vmQ41h93XEksD'.split('').reverse().join('')
}`;

// export const P_VAL = 'crewcabanger18';
export const P_VAL = '1';

export const NEW_LINE = '$NEW_LINE';
// export const ENDPOINT = 'ws://44.202.28.38:8080/';
export const ENDPOINT = 'ws://localhost:8080/';

export const CONTROL_PANEL = 'CONTROL_PANEL';
export const USER_NAME = 'USER_NAME';
export const USER_ANSWERS = 'USER_ANSWERS';

export const GROUP_NAME_SEPARATOR = '___&___';

import { createSlice } from '@reduxjs/toolkit';
import { SELECT_TEMPLATE } from 'constants';

const initialTemplates = {
  [SELECT_TEMPLATE]: {
    type: SELECT_TEMPLATE,
    title: '',
    questions: [],
  },
};
const initialState = {
  title: '',
  questions: [],
};

const templateCreationSlice = createSlice({
  name: 'templateCreation',
  initialState,
  reducers: {
    initTemplate: (_state, { payload: { type, task } }) => task || ({
      ...initialTemplates[type],
    }),
    modifyTemplate: (state, { payload: newState }) => ({
      ...state,
      ...newState,
    }),
    deleteTemplate: () => initialState,
  },
});

export const {
  initTemplate,
  modifyTemplate,
  deleteTemplate,
} = templateCreationSlice.actions;
export default templateCreationSlice;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  questions: [],
  media: [],
};

const templateCreationSlice = createSlice({
  name: 'templateCreation',
  initialState,
  reducers: {
    initTemplate: (_state, { payload: { task, type } }) => task || ({
      ...initialState,
      type,
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

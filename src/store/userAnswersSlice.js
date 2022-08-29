import { createSlice } from '@reduxjs/toolkit';

const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState: [],
  reducers: {
    saveAnswers: (state, { payload: answers }) => [
      ...state,
      ...answers,
    ],
    cleanAnswers: () => [],
  },
});

export const { saveAnswers, cleanAnswers } = userAnswersSlice.actions;
export default userAnswersSlice;

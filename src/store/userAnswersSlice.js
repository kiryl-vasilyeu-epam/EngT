import { createSlice } from '@reduxjs/toolkit';

const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState: {
    tasks: [],
    checked: false,
  },
  reducers: {
    initUserAnswers: (state, { payload: tasks }) => ({
      ...state,
      tasks,
    }),
    setChecked: (state, { payload: checked = true }) => ({
      ...state,
      checked,
    }),
    updateUserAnswer: (state, { payload: { taskId, userAnswer } }) => ({
      ...state,
      tasks: state.tasks.map((task) => (task.id === taskId ? userAnswer : task)),
    }),
  },
});

export const { initUserAnswers, setChecked, updateUserAnswer } = userAnswersSlice.actions;
export default userAnswersSlice;

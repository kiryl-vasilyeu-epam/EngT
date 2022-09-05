import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'constants';

const updateUserAnswersCash = (newState) => {
  const state = JSON.stringify(newState);
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ANSWERS, state);
};

const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState: {
    tasks: [],
    checked: false,
    id: '',
  },
  reducers: {
    initUserAnswers: (state, { payload: { tasks, id } }) => {
      const userAnswers = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ANSWERS) || '{}',
      );
      if (userAnswers.id === id) {
        return userAnswers;
      }

      return {
        ...state,
        tasks,
        id,
      };
    },
    setChecked: (state, { payload: checked = true }) => {
      const newState = {
        ...state,
        checked,
      };
      updateUserAnswersCash(newState);
      return newState;
    },
    updateUserAnswer: (state, { payload: { taskId, userAnswer } }) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => (task.id === taskId ? userAnswer : task)),
      };
      updateUserAnswersCash(newState);
      return newState;
    },
  },
});

export const { initUserAnswers, setChecked, updateUserAnswer } = userAnswersSlice.actions;
export default userAnswersSlice;
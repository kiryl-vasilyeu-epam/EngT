import { createSlice, current } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'constants';
import { getScore } from './helpers';

const updateUserAnswersCash = (newState) => {
  const state = JSON.stringify(newState);
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ANSWERS, state);
};

const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState: {
    tasks: [],
    id: '',
    userScore: 0,
    tasksChecked: 0,
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
        userScore: 0,
        tasksChecked: 0,
      };
    },
    setChecked: (state, { payload: id }) => {
      const tasks = current(state.tasks);
      let tasksChecked = 0;
      let scoreSum = 0;
      const newState = {
        ...state,
        tasks: tasks.map((task) => {
          if (task.id === id) {
            const newTask = {
              ...task,
              checked: !task.checked,
              userScore: getScore(task),
            };
            if (newTask.checked) {
              tasksChecked += 1;
              scoreSum += newTask.userScore;
            }
            return newTask;
          }
          if (task.checked) {
            tasksChecked += 1;
            scoreSum += task.userScore;
          }
          return task;
        }),
        tasksUserScore: +(scoreSum / tasksChecked).toFixed(1),
        tasksChecked,
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

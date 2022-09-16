import { createSlice, current } from '@reduxjs/toolkit';
import { getScore } from './helpers';

const initialState = {
  tasks: [],
  userName: '',
  userScore: 0,
  tasksChecked: 0,
  updatedBySocket: true,
};
const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState,
  reducers: {
    initUserAnswers: (state, { payload: userAnswerData }) => ({
      ...initialState,
      ...userAnswerData,
      updatedBySocket: true,
    }),
    setChecked: (state, { payload: id }) => {
      const tasks = current(state.tasks);
      let tasksChecked = 0;
      let scoreSum = 0;
      return {
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
        updatedBySocket: false,
      };
    },
    updateUserAnswer: (state, { payload: { taskId, userAnswer } }) => ({
      ...state,
      tasks: state.tasks.map((task) => (task.id === taskId ? userAnswer : task)),
      updatedBySocket: false,
    }),
  },
});

export const { initUserAnswers, setChecked, updateUserAnswer } = userAnswersSlice.actions;
export default userAnswersSlice;

import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, { payload: task }) => [
      ...state,
      {
        ...task,
        id: uniqueId('task_'),
      },
    ],
    modifyTask: (state, { payload: task }) => state.map(
      (iTask) => (iTask.id === task.id ? task : iTask),
    ),
    removeTask: (state, { payload: taskId }) => state.filter(({ id }) => id !== taskId),
  },
});

export const { addTask, removeTask, modifyTask } = tasksSlice.actions;
export default tasksSlice;

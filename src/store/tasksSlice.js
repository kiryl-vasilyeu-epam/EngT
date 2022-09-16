import { createSlice } from '@reduxjs/toolkit';
import {
  find, findIndex, uniqueId,
} from 'lodash';

const initialState = {
  list: [],
  id: '',
  updatedBySocket: true,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTasks: (state, { payload: tasksData }) => ({
      ...state,
      ...tasksData,
      updatedBySocket: true,
    }),
    addTask: (state, { payload: task }) => ({
      ...state,
      id: uniqueId(Date.now()),
      list: [
        ...state.list,
        {
          ...task,
          id: uniqueId('task_'),
        },
      ],
      updatedBySocket: false,
    }),
    rearrangeTasks: (state, { payload: { from, to } }) => {
      const list = state.list.filter(({ id }) => id !== from);
      const toIndex = findIndex(list, { id: to });

      list.splice(toIndex, 0, find(state.list, { id: from }));

      return {
        ...state,
        id: uniqueId(Date.now()),
        list,
        updatedBySocket: false,
      };
    },
    modifyTask: (state, { payload: task }) => ({
      ...state,
      id: uniqueId(Date.now()),
      list: state.list.map(
        (iTask) => (iTask.id === task.id ? task : iTask),
      ),
      updatedBySocket: false,
    }),
    removeTask: (state, { payload: taskId }) => ({
      ...state,
      id: uniqueId(Date.now()),
      list: state.list.filter(({ id }) => id !== taskId),
      updatedBySocket: false,
    }),
  },
});

export const {
  addTask, removeTask, modifyTask, rearrangeTasks, initTasks,
} = tasksSlice.actions;
export default tasksSlice;

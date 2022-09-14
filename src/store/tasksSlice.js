import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'constants';
import {
  find, findIndex, uniqueId,
} from 'lodash';
import { Lesson } from 'data';

const initialState = {
  list: [],
  loading: null,
  id: '',
};

const loadTasks = createAsyncThunk(
  'tasks/loadTasks',
  async () => {
    try {
      const { tasks, id } = Lesson;
      localStorage.setItem(LOCAL_STORAGE_KEYS.LESSON_ID, id);

      return { tasks: tasks || [], id: id || '' };
    } catch (e) {
      return { tasks: [], id: '' };
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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
    }),
    rearrangeTasks: (state, { payload: { from, to } }) => {
      const list = state.list.filter(({ id }) => id !== from);
      const toIndex = findIndex(list, { id: to });

      list.splice(toIndex, 0, find(state.list, { id: from }));

      return {
        ...state,
        id: uniqueId(Date.now()),
        list,
      };
    },
    modifyTask: (state, { payload: task }) => ({
      ...state,
      id: uniqueId(Date.now()),
      list: state.list.map(
        (iTask) => (iTask.id === task.id ? task : iTask),
      ),
    }),
    removeTask: (state, { payload: taskId }) => ({
      ...state,
      id: uniqueId(Date.now()),
      list: state.list.filter(({ id }) => id !== taskId),
    }),
  },
  extraReducers: {
    [loadTasks.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [loadTasks.fulfilled]: (state, { payload: { tasks, id } }) => ({
      list: tasks,
      id,
      loading: false,
    }),
  },
});

export const {
  addTask, removeTask, modifyTask, rearrangeTasks,
} = tasksSlice.actions;
export { loadTasks };
export default tasksSlice;

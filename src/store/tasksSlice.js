import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [
    {
      id: 1,
      title: 'TITLE: This is the first task in a list',
      type: 'SELECT_TEMPLATE',
      questions: [
        {
          id: 10,
          title: 'This is the first task question',
          answers: [
            { title: 'First task variant', isCorrect: false, id: 100 },
            { title: 'Second task variant', isCorrect: true, id: 200 },
          ],
          multiline: false,
        },
      ],
    },
    {
      id: 2,
      title: 'TITLE: This is the second task in a list',
      type: 'SELECT_TEMPLATE',
      questions: [
        {
          id: 20,
          title: 'This is the first task question, multiline',
          answers: [
            { title: 'First task variant', isCorrect: true, id: 300 },
            { title: 'Second task variant', isCorrect: false, id: 400 },
            { title: 'Third task variant', isCorrect: true, id: 500 },
          ],
          multiline: true,
        },
        {
          id: 30,
          title: 'This is the second task question',
          answers: [
            { title: 'First task variant', isCorrect: true, id: 600 },
            { title: 'Second task variant', isCorrect: false, id: 700 },
            { title: 'Third task variant', isCorrect: false, id: 800 },
          ],
          multiline: false,
        },
        {
          id: 40,
          title: 'This is the third task question, multiline',
          answers: [
            { title: 'First task variant', isCorrect: true, id: 900 },
            { title: 'Second task variant', isCorrect: true, id: 1000 },
            { title: 'Third task variant', isCorrect: false, id: 1100 },
          ],
          multiline: true,
        },
      ],
    },
  ],
  reducers: {
    addTask: (state, { payload: task }) => [
      ...state,
      {
        ...task,
        id: uniqueId('task_'),
      },
    ],
    removeTask: (state, { payload: taskId }) => state.filter(({ id }) => id !== taskId),
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice;

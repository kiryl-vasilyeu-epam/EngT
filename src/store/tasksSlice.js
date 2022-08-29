import { createSlice } from '@reduxjs/toolkit';
import { compact, filter } from 'lodash';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [
    {
      title: 'TITLE: This is the first task in a list',
      type: 'SELECT_TEMPLATE',
      questions: [
        {
          question: 'This is the first task question',
          answers: [
            { title: 'First task variant', isCorrect: false },
            { title: 'Second task variant', isCorrect: true },
          ],
          multiline: false,
        },
      ],
    },
    {
      title: 'TITLE: This is the second task in a list',
      type: 'SELECT_TEMPLATE',
      questions: [
        {
          question: 'This is the first task question, multiline',
          answers: [
            { title: 'First task variant', isCorrect: true },
            { title: 'Second task variant', isCorrect: false },
            { title: 'Third task variant', isCorrect: true },
          ],
          multiline: true,
        },
        {
          question: 'This is the second task question',
          answers: [
            { title: 'First task variant', isCorrect: true },
            { title: 'Second task variant', isCorrect: false },
            { title: 'Third task variant', isCorrect: false },
          ],
          multiline: false,
        },
        {
          question: 'This is the third task question, multiline',
          answers: [
            { title: 'First task variant', isCorrect: true },
            { title: 'Second task variant', isCorrect: true },
            { title: 'Third task variant', isCorrect: false },
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
        questions: task.questions.map((question) => ({
          ...question,
          multiline: filter(question.answers, { isCorrect: true }).length > 1,
        })),
      },
    ],
    removeTask: (state, { payload: index }) => compact(
      state.map((task, taskIndex) => {
        if (taskIndex !== index) return task;
        return null;
      }),
    ),
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice;

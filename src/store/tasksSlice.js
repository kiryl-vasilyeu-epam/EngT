import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const initialState = [
  {
    type: 'DROPDOWN_TEMPLATE',
    title: 'Some fucking title',
    id: 'task_53',
    questions: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: 'template_question_7',
        words: [

          {
            title: 'Lorem', isActive: false, id: 'template_word62', options: [{ title: '', id: 'option_template_word89' }],
          },
          {
            title: 'ipsum dolor', isActive: true, id: 'template_word64', options: [{ title: 'finger', id: 'option_template_word90' }, { title: 'ass', id: 'option_template_word91' }],
          },
          {
            title: 'sit', isActive: false, id: 'template_word68', options: [{ title: '', id: 'option_template_word92' }],
          },
          {
            title: 'amet,', isActive: false, id: 'template_word70', options: [{ title: '', id: 'option_template_word93' }],
          },
          {
            title: 'consectetur', isActive: false, id: 'template_word72', options: [{ title: '', id: 'option_template_word94' }],
          },
          {
            title: 'adipiscing', isActive: false, id: 'template_word74', options: [{ title: '', id: 'option_template_word95' }],
          },
          {
            title: 'elit, sed', isActive: false, id: 'template_word76', options: [{ title: '', id: 'option_template_word96' }],
          },
          {
            title: 'do', isActive: false, id: 'template_word80', options: [{ title: '', id: 'option_template_word97' }],
          },
          {
            title: 'eiusmod', isActive: true, id: 'template_word82', options: [{ title: 'dungeon master', id: 'option_template_word900' }, { title: '300 bucks', id: 'option_template_word910' }],
          },
          {
            title: 'tempor', isActive: false, id: 'template_word84', options: [{ title: '', id: 'option_template_word98' }],
          },
          {
            title: 'incididunt', isActive: false, id: 'template_word86', options: [{ title: '', id: 'option_template_word99' }],
          },
          {
            title: 'ut', isActive: false, id: 'template_word88', options: [{ title: '', id: 'option_template_word100' }],
          },
          {
            title: 'labore', isActive: false, id: 'template_word90', options: [{ title: '', id: 'option_template_word101' }],
          },
          {
            title: 'et', isActive: false, id: 'template_word92', options: [{ title: '', id: 'option_template_word102' }],
          },
          {
            title: 'dolore', isActive: false, id: 'template_word94', options: [{ title: '', id: 'option_template_word103' }],
          },
          {
            title: 'magna', isActive: false, id: 'template_word96', options: [{ title: '', id: 'option_template_word104' }],
          },
          {
            title: 'aliqua.', isActive: false, id: 'template_word98', options: [{ title: '', id: 'option_template_word105' }],
          },
        ],
      },
    ],

  },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [...initialState],
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

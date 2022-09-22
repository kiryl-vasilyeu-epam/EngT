import { createSlice } from '@reduxjs/toolkit';
import { some } from 'lodash';

const appConnectionSlice = createSlice({
  name: 'appConnection',
  initialState: {
    connected: false,
    userRegistered: false,
    onlineUsers: [],
    activeUsers: [],
    lessons: [],
    userName: '',
  },
  reducers: {
    setConnection: (state, { payload: connected }) => ({
      ...state,
      connected,
      userRegistered: false,
    }),
    setUserRegistered: (state, { payload: userRegistered = true }) => ({
      ...state,
      userRegistered,
    }),
    setUserName: (state, { payload: userName }) => ({
      ...state,
      userName,
    }),
    setOnlineUsers: (state, { payload: onlineUsers }) => ({
      ...state,
      onlineUsers,
    }),
    setActiveUsers: (state, { payload: activeUsers }) => ({
      ...state,
      activeUsers,
    }),
    updateActiveUsers: (state, { payload: { userName, userAnswer } }) => {
      const isUserExist = some(state.activeUsers, ([name]) => name === userName);
      const activeUsers = state.activeUsers.map(
        ([name, answer]) => [name, (name === userName ? userAnswer : answer)],
      );

      if (!isUserExist) {
        activeUsers.push([userName, userAnswer]);
      }

      return {
        ...state,
        activeUsers,
      };
    },
    setLessons: (state, { payload: lessons }) => ({
      ...state,
      lessons,
    }),
    updateLesson: (state, { payload: { sheetId, title } }) => {
      const isLessonExist = some(state.lessons, (lesson) => lesson.sheetId === sheetId);

      const lessons = state.lessons.map(
        (lesson) => (lesson.sheetId === sheetId
          ? { sheetId, title }
          : lesson),
      );

      if (!isLessonExist) {
        lessons.push({ sheetId, title });
      }

      return {
        ...state,
        lessons,
      };
    },
    deleteLesson: (state, { payload: sheetId }) => ({
      ...state,
      lessons: state.lessons.filter(
        (lesson) => lesson.sheetId !== sheetId,
      ),
    }),
  },
});

export const {
  setConnection, setUserRegistered,
  setUserName,
  setOnlineUsers,
  setActiveUsers, updateActiveUsers,
  setLessons, updateLesson, deleteLesson,
} = appConnectionSlice.actions;
export default appConnectionSlice;

import { createSlice } from '@reduxjs/toolkit';
import { some } from 'lodash';

const appConnectionSlice = createSlice({
  name: 'appConnection',
  initialState: {
    connected: false,
    onlineUsers: [],
    activeUsers: [],
  },
  reducers: {
    setConnection: (state, { payload: connected }) => ({
      ...state,
      connected,
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
  },
});

export const {
  setConnection, setOnlineUsers, setActiveUsers, updateActiveUsers,
} = appConnectionSlice.actions;
export default appConnectionSlice;

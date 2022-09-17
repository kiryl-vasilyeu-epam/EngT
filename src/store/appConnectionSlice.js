import { createSlice } from '@reduxjs/toolkit';

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
    updateActiveUsers: (state, { payload: { userName, userAnswer } }) => ({
      ...state,
      activeUsers: state.activeUsers.map(
        ([name, answer]) => [name, (name === userName ? userAnswer : answer)],
      ),
    }),
  },
});

export const {
  setConnection, setOnlineUsers, setActiveUsers, updateActiveUsers,
} = appConnectionSlice.actions;
export default appConnectionSlice;

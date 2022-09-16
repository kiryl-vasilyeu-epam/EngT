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
  },
});

export const {
  setConnection, setOnlineUsers, setActiveUsers,
} = appConnectionSlice.actions;
export default appConnectionSlice;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { setConnection } from 'store';

export const SocketContext = React.createContext();
const socketio = io('ws://localhost:1337', {
  reconnectionDelayMax: 10000,
});

const WebsocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socketio.on('connect', () => {
      dispatch(setConnection(true));
    });
    socketio.on('disconnect', () => {
      dispatch(setConnection(false));
    });
  }, []);
  return (
    <SocketContext.Provider value={socketio}>
      {children}
    </SocketContext.Provider>
  );
};

export default WebsocketProvider;

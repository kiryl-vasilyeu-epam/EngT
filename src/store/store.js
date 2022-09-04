/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';
import userAnswersSlice from './userAnswersSlice';
import modalsControlSlice from './modalsControlSlice';
import templateCreationSlice from './templateCreationSlice';

const logger = (store) => (next) => (action) => {
  console.group(`%c${action.type}`, 'color: #e3445f');
  const currentState = store.getState();
  console.log('%ccurrent state', 'color: #52b1fa', currentState);
  console.info('%cdispatching', 'color: #57ffbc', action);
  const result = next(action);
  const nextState = store.getState();
  console.log('%cnext state', 'color: #52b1fa', nextState);
  console.log('%cJSON logs', 'color: #ffdd57', {
    json: [JSON.stringify({
      currentState,
      action,
      nextState,
    })],
  });
  console.groupEnd();
  return result;
};

export default configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    userAnswers: userAnswersSlice.reducer,
    modal: modalsControlSlice.reducer,
    template: templateCreationSlice.reducer,
  },
  middleware: [logger],
});

import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';
import userAnswersSlice from './userAnswersSlice';
import modalsControlSlice from './modalsControlSlice';

export default configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    userAnswers: userAnswersSlice.reducer,
    modal: modalsControlSlice.reducer,
  },
});

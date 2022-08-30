import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';
import userAnswersSlice from './userAnswersSlice';
import modalsControlSlice from './modalsControlSlice';
import templateCreationSlice from './templateCreationSlice';

export default configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    userAnswers: userAnswersSlice.reducer,
    modal: modalsControlSlice.reducer,
    template: templateCreationSlice.reducer,
  },
});

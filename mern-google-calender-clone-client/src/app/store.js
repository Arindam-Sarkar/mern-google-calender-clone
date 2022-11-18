import { configureStore } from '@reduxjs/toolkit';
import currentMonthReducer from '../features/currentMonth/currentMonthSlice.js'
import taskListReducer from '../features/tasksList/taskListSlice.js'
import userAuthReducer from '../features/userAuth/userAuthSlice.js'

export const store = configureStore({
  reducer: {
    currentMonth: currentMonthReducer,
    taskList: taskListReducer,
    userAuth: userAuthReducer
  },
});

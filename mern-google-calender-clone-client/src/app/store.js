import { configureStore } from '@reduxjs/toolkit';
import currentMonthReducer from '../features/currentMonth/currentMonthSlice.js'

export const store = configureStore({
  reducer: {
    currentMonth: currentMonthReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  }
});


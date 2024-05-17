import {combineReducers} from '@reduxjs/toolkit';
import bookReducer from '../book/bookSlice';
import userReducer from '../user/userSlice';

export const Reducers = combineReducers({
  book: bookReducer,
  user: userReducer,
});

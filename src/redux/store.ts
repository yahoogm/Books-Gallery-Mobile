import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {Reducers} from './reducer/reducer';

export const Store = configureStore({
  reducer: Reducers,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

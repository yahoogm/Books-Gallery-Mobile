import {RootState} from '../store';

export const userSelector = (state: RootState) => state.user.user;
export const isLoginSelector = (state: RootState) => state.user.isLogin;

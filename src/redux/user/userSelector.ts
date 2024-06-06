import {RootState} from '../store';

export const useUserSelector = (state: RootState) => state.user.user;

export const useIsLoginSelector = (state: RootState) => state.user.isLogin;

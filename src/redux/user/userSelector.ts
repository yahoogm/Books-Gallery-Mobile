import {RootState} from '../store';
import {useSelector} from 'react-redux';

export const useUserSelector = (state: RootState) => state.user.user;

export const useIsLoginSelector = (state: RootState) => state.user.isLogin;

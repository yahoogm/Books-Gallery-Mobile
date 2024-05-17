import {RootState} from '../store';
import {useSelector} from 'react-redux';

export const useUserSelector = () =>
  useSelector((state: RootState) => state.user);

export const useIsLoginSelector = () =>
  useSelector((state: RootState) => state.user.isLogin);

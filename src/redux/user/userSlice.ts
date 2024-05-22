import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user:
    {
      email: '',
      familyName: '',
      givenName: '',
      id: '',
      name: '',
      photo: '',
    } || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    },

    logoutUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLogin: false,
      };
    },
  },
});

const {actions, reducer: userReducer} = userSlice;
export const {loginUser, logoutUser} = actions;
export default userReducer;

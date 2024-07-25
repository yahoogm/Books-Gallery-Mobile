import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';

type Params = {
  search?: string;
  bookId?: string;
};

export const retrieveSearchBooks = createAsyncThunk(
  'product/retrieveSearch',
  async (param: Params) => {
    const res = await axios.get(
      `${Config.API_URL}/volumes?q=intitle:${param.search}&key=${Config.API_KEY}`,
    );

    return res.data;
  },
);

export const retrieveDetailBook = createAsyncThunk(
  'product/retrieveDetailBook',
  async (param: Params) => {
    const res = await axios.get(
      `${Config.API_URL}/volumes/${param.bookId}?=${Config.API_KEY}`,
    );
    return res.data;
  },
);

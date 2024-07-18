import {API_KEY, API_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

type Params = {
  search?: string;
  bookId?: string;
};

export const retrieveSearchBooks = createAsyncThunk(
  'product/retrieveSearch',
  async (param: Params) => {
    const res = await axios.get(
      `${API_URL}/volumes?q=intitle:${param.search}&key=${API_KEY}`,
    );

    return res.data;
  },
);

export const retrieveDetailBook = createAsyncThunk(
  'product/retrieveDetailBook',
  async (param: Params) => {
    const res = await axios.get(
      `${API_URL}/volumes/${param.bookId}?=${API_KEY}`,
    );
    return res.data;
  },
);

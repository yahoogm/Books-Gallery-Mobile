import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

type Params = {
  search: string;
};

export const retrieveSearchBooks = createAsyncThunk(
  'product/retrieveSearch',
  async (param: Params) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${param.search}&key=AIzaSyBSAX-msAaEmoJYIae3XsXuOx2oVr7Ta-I`,
    );
    return res.data;
  },
);

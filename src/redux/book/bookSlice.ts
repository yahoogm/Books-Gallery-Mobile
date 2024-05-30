import {createSlice} from '@reduxjs/toolkit';
import {retrieveSearchBooks} from './bookThunk';
import {BookState} from '../../types/types';

const initialState: BookState = {
  books: {
    items: [],
  },
  readBook: [],
  reviewBook: [],
  detailBook: {
    id: '',
    volumeInfo: {
      title: '',
      publishedDate: '',
      author: [''],
      description: '',
      imageLinks: {
        smallThumbnail: '',
        thumbnail: '',
        large: '',
      },
      publisher: '',
    },
  },
  reviewId: '',
  type: '',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addDetailBook: (state, action) => {
      return {
        ...state,
        detailBook: action.payload,
      };
    },

    addReadBook: (state, action) => {
      return {
        ...state,
        readBook: action.payload,
      };
    },

    addReviewBook: (state, action) => {
      return {
        ...state,
        reviewBook: action.payload,
      };
    },

    addReviewId: (state, action) => {
      return {
        ...state,
        reviewId: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      //#region retrieve search
      .addCase(retrieveSearchBooks.pending, (state, action) => {
        return {
          ...state,
          type: action.type,
        };
      })
      .addCase(retrieveSearchBooks.fulfilled, (state, action) => {
        return {
          ...state,
          books: action.payload,
          type: action.type,
        };
      })
      .addCase(retrieveSearchBooks.rejected, (state, action) => {
        return {
          ...state,
          type: action.type,
        };
      });
    //#endregion retrieve search
  },
});

const {actions, reducer: bookReducer} = bookSlice;
export const {addDetailBook, addReadBook, addReviewBook, addReviewId} = actions;
export default bookReducer;

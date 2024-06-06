import {createSlice} from '@reduxjs/toolkit';
import {retrieveDetailBook, retrieveSearchBooks} from './bookThunk';
import {BookState} from '../../types/types';

const initialState: BookState = {
  books: {
    items: [],
  },
  reviewBook: [],
  detailBook: {
    id: '',
    volumeInfo: {
      title: '',
      publishedDate: '',
      authors: [''],
      description: '',
      imageLinks: {
        smallThumbnail: '',
        thumbnail: '',
        large: '',
      },
      publisher: '',
      pageCount: 0,
      categories: [''],
      industryIdentifiers: [{identifier: '', type: ''}],
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
      })
      //#endregion retrieve search

      //#region retrieve detail book
      .addCase(retrieveDetailBook.pending, (state, action) => {
        return {
          ...state,
          type: action.type,
        };
      })
      .addCase(retrieveDetailBook.fulfilled, (state, action) => {
        return {
          ...state,
          detailBook: action.payload,
          type: action.type,
        };
      })
      .addCase(retrieveDetailBook.rejected, (state, action) => {
        return {
          ...state,
          type: action.type,
        };
      });
    //#endregion retrieve detail book
  },
});

const {actions, reducer: bookReducer} = bookSlice;
export const {addDetailBook, addReadBook, addReviewId} = actions;
export default bookReducer;

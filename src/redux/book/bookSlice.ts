import {createSlice} from '@reduxjs/toolkit';
import {retrieveDetailBook, retrieveSearchBooks} from './bookThunk';
import {BookState} from '../../types/types';

const initialState: BookState = {
  books: {
    items: [],
  },

  commentBook: [
    {
      bookId: '',
      createdAt: '',
      id: '',
      profilePic: '',
      ulasan: '',
      updatedAt: '',
      userId: '',
      userName: '',
    },
  ],

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

  commentId: '',
  type: '',
  typeDetailBook: 'product/retrieveDetailBook/pending',
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

    retrieveCommentBook: (state, action) => {
      return {
        ...state,
        commentBook: action.payload,
      };
    },

    addCommentId: (state, action) => {
      return {
        ...state,
        commentId: action.payload,
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
          typeDetailBook: action.type,
        };
      })
      .addCase(retrieveDetailBook.fulfilled, (state, action) => {
        return {
          ...state,
          detailBook: action.payload,
          typeDetailBook: action.type,
        };
      })
      .addCase(retrieveDetailBook.rejected, (state, action) => {
        return {
          ...state,
          typeDetailBook: action.type,
        };
      });
    //#endregion retrieve detail book
  },
});

const {actions, reducer: bookReducer} = bookSlice;
export const {addDetailBook, addReadBook, retrieveCommentBook, addCommentId} =
  actions;
export default bookReducer;

import {RootState} from '../store';

export const searchBooksSelector = (state: RootState) => state.book.books;
export const searchBookTypeSelector = (state: RootState) => state.book.type;
export const detailBookSelector = (state: RootState) => state.book.detailBook;
export const commentBookSelector = (state: RootState) => state.book.commentBook;
export const typeBookSelector = (state: RootState) => state.book.typeDetailBook;
export const commentIdBookSelector = (state: RootState) => state.book.commentId;

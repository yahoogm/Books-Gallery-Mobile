import {RootState} from '../store';

export const searchBooks = (state: RootState) => state.book.books;
export const useSearchBookType = (state: RootState) => state.book.type;
export const detailBookSelector = (state: RootState) => state.book.detailBook;
export const useReviewBookSelector = (state: RootState) =>
  state.book.reviewBook;
export const typeBookSelector = (state: RootState) => state.book.typeDetailBook;

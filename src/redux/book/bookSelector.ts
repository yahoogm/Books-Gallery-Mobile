import {RootState} from '../store';

export const searchBooks = (state: RootState) => state.book.books;
export const useSearchBookType = (state: RootState) => state.book.type;

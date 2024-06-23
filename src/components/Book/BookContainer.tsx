import Book from './Book';
import {useAppSelector} from '../../hooks/useRedux';
import {detailBookSelector} from '../../redux/book/bookSelector';
import {modifiedName} from '../../utils/const/const';
import {BookContainerProps} from './types';

const BookContainer: React.FC<BookContainerProps> = ({
  refReadBook,
  setShowBook,
}) => {
  const detailBook = useAppSelector(detailBookSelector);

  const authorsName = modifiedName(detailBook.volumeInfo.authors);
  const categories = modifiedName(detailBook.volumeInfo.categories);

  const uriDetailBook =
    detailBook.volumeInfo.imageLinks &&
    detailBook.volumeInfo.imageLinks.thumbnail
      ? detailBook.volumeInfo.imageLinks.thumbnail
      : 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Book
      setShowBook={setShowBook}
      refReadBook={refReadBook}
      detailBook={detailBook}
      categories={categories}
      uriDetailBook={uriDetailBook}
      authorsName={authorsName}
    />
  );
};

export default BookContainer;

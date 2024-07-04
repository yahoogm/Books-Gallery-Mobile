import ReadBook from './ReadBook';
import {ReadBookProps} from './types';

const ReadBookContainer: React.FC<ReadBookProps> = ({
  refReadBook,
  setShowBook,
  showBook,
  isbn,
}) => {
  return (
    <ReadBook
      refReadBook={refReadBook}
      setShowBook={setShowBook}
      showBook={showBook}
      isbn={isbn}
    />
  );
};

export default ReadBookContainer;

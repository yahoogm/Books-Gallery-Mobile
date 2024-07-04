export type ReadBookProps = {
  setShowBook: React.Dispatch<React.SetStateAction<boolean>>;
  showBook: boolean;
  refReadBook: React.RefObject<any>;
  isbn: number;
};

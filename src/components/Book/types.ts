import {VolumeInfo} from '../../types/types';

type DetailBookType = {
  volumeInfo: VolumeInfo;
};

export type BookProps = {
  uriDetailBook: string;
  authorsName: string[] | string;
  categories: string[] | string;
  detailBook: DetailBookType;
  setShowBook: React.Dispatch<React.SetStateAction<boolean>>;
  refReadBook: React.RefObject<any>;
};

export type BookContainerProps = {
  setShowBook: React.Dispatch<React.SetStateAction<boolean>>;
  refReadBook: React.RefObject<any>;
};

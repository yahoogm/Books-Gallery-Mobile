type VolumeInfo = {
  title: string;
  publishedDate: string;
  description: string;
  author: Array<string>;
  publisher: string;
  imageLinks: {smallThumbnail: string; thumbnail: string; large?: string};
};

export type BookItem = {
  id: string;
  volumeInfo: VolumeInfo;
};

export type BookState = {
  type: string;
  reviewId: string;
  detailBook: BookItem;
  books: {
    items: [];
  };
  reviewBook: [];
  readBook: [];
};

export type userItem = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
};

export type RootStackParamList = {
  DetailBook: {bookId: string};
};

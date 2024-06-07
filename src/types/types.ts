type VolumeInfo = {
  title: string;
  publishedDate: string;
  description: string;
  authors: Array<string>;
  publisher: string;
  pageCount: number;
  imageLinks: {smallThumbnail: string; thumbnail: string; large?: string};
  categories: Array<string>;
  industryIdentifiers: Array<{identifier: string; type: string}>;
};

export type Review = {
  bookId: string;
  createdAt: {};
  id: string;
  profilePic: string;
  ulasan: string;
  updatedAt: {};
  userId: string;
  userName: string;
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
  reviewBook: Array<Review>;
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
  Login: undefined;
};

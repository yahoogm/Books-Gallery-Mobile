export type VolumeInfo = {
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

export type Comment = {
  bookId: string;
  createdAt: string;
  id: string;
  profilePic: string;
  ulasan: string;
  updatedAt: string;
  userId: string;
  userName: string;
};

export type BookItem = {
  id: string;
  volumeInfo: VolumeInfo;
};

export type BookState = {
  type: string;
  commentId: string;
  detailBook: BookItem;
  books: {
    items: [];
  };
  commentBook: Array<Comment>;
  typeDetailBook: string;
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

export type addReviewValues = {
  userName: string;
  bookId: string;
  profilePic: string;
  id: string;
  ulasan: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

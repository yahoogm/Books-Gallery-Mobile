import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BookItem, Comment, RootStackParamList} from '../../types/types';
import {ObjectSchema} from 'yup';

export type FormCommentValues = {
  comment: string;
};

export type AddCommentValues = {
  userName: string;
  bookId: string;
  profilePic: string;
  id: string;
  ulasan: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

// type for handling navigation to login page
export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type ToastRenderProps = {
  id: string;
};

export type UserItem = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
};

export type HandleBookCommentFunction = {
  handleNavigateUserNotLogin: () => void;
  handleAddCommentBook: (review: AddCommentValues) => void;
  handleDeleteCommentBook: () => void;
  handleUpdateCommentBook: (ulasan: string, updateAt: string) => void;
  getIdDocumentFromFirestore: (id: string) => void;
};

export type CommentProps = {
  refOpenDeleteModal: React.RefObject<any>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleButton: HandleBookCommentFunction;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  commentSchema: ObjectSchema<FormCommentValues>;
  initialValues: FormCommentValues;
  isLogin: boolean;
  user: UserItem;
  detailBook: BookItem;
  commentBook: Array<Comment>;
};

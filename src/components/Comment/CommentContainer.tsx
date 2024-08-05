import Comment from './Comment';
import {useToast} from '@gluestack-ui/themed';
import {useCallback, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationProp,
  FormCommentValues,
  ToastRenderProps,
  HandleBookCommentFunction,
  AddCommentValues,
} from './types';

import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  commentBookSelector,
  commentIdBookSelector,
  detailBookSelector,
} from '../../redux/book/bookSelector';
import {addCommentId} from '../../redux/book/bookSlice';
import 'react-native-get-random-values';
import ToastAlert from '../ToastAlert/ToastAlert';
import {isLoginSelector, userSelector} from '../../redux/user/userSelector';

const CommentContainer = () => {
  const toast = useToast();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const commentBookId = useAppSelector(commentIdBookSelector);
  const commentBook = useAppSelector(commentBookSelector);
  const detailBook = useAppSelector(detailBookSelector);
  const isLogin = useAppSelector(isLoginSelector);
  const user = useAppSelector(userSelector);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const refOpenDeleteModal = useRef(null);

  // form add review
  const initialValues: FormCommentValues = {comment: ''};

  const showToast = (
    message: string,
    action: 'success' | 'info' | 'error' | 'warning' | 'attention',
  ) => {
    toast.show({
      placement: 'bottom',
      duration: 2000,
      render: ({id}: ToastRenderProps) => {
        const toastId = 'toast-' + id;
        return <ToastAlert id={toastId} message={message} action={action} />;
      },
    });
  };

  // function to handle if the user not logged in
  const handleNavigateUserNotLogin: HandleBookCommentFunction['handleNavigateUserNotLogin'] =
    () => {
      navigation.navigate('Login');
      showToast('Please login first!', 'info');
    };

  // function to handle add comment for a book
  const handleAddCommentBook: HandleBookCommentFunction['handleAddCommentBook'] =
    (review: AddCommentValues) => {
      try {
        firestore()
          .collection('ulasan')
          .add(review)
          .then(() => {
            showToast('Comment sent', 'success');
          });
      } catch (error) {
        showToast('Comment failed to send', 'error');
      }
    };

  // function to handle delete comment for a book
  const handleDeleteCommentBook: HandleBookCommentFunction['handleDeleteCommentBook'] =
    useCallback(() => {
      try {
        firestore()
          .collection('ulasan')
          .doc(commentBookId)
          .delete()
          .then(() => {
            showToast('Success delete comment', 'success');
          });
      } catch (error) {
        showToast('Comment failed to delete', 'error');
      }
    }, [commentBookId]);

  // function to handle update a book
  const handleUpdateCommentBook: HandleBookCommentFunction['handleUpdateCommentBook'] =
    useCallback(
      (ulasan: string, updatedAt: string) => {
        try {
          firestore()
            .collection('ulasan')
            .doc(commentBookId)
            .update({
              ulasan,
              updatedAt,
            })
            .then(() => {
              showToast('Success update comment', 'success');
            });

          setIsEdit(false);
        } catch (error) {
          showToast('Comment failed to update', 'error');
        }
      },
      [commentBookId],
    );

  // function to handle get id document a book from firestore
  const getIdDocumentFromFirestore: HandleBookCommentFunction['getIdDocumentFromFirestore'] =
    useCallback(
      (id: string) => {
        try {
          firestore()
            .collection('ulasan')
            .where('id', '==', id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dispatch(addCommentId(documentSnapshot.id));
              });
            });
        } catch (error) {
          showToast('Failed get id!', 'error');
        }
      },
      [dispatch],
    );

  const handleButton: HandleBookCommentFunction = {
    handleNavigateUserNotLogin,
    handleAddCommentBook,
    handleDeleteCommentBook,
    handleUpdateCommentBook,
    getIdDocumentFromFirestore,
  };

  return (
    <Comment
      refOpenDeleteModal={refOpenDeleteModal}
      deleteModal={deleteModal}
      setDeleteModal={setDeleteModal}
      handleButton={handleButton}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      initialValues={initialValues}
      isLogin={isLogin}
      user={user}
      detailBook={detailBook}
      commentBook={commentBook}
    />
  );
};

export default CommentContainer;

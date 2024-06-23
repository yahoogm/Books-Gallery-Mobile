import Comment from './Comment';
import {VStack, Toast, ToastTitle, useToast} from '@gluestack-ui/themed';
import {useCallback, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationProp,
  FormCommentValues,
  ToastRenderProps,
  HandleBookCommentFunction,
  AddCommentValues,
} from './types';
import * as Yup from 'yup';
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
  const commentSchema = Yup.object().shape({
    comment: Yup.string()
      .min(10, 'Minimal 10 karakter')
      .max(200, 'Maximal 100 karakter')
      .required('Mohon mengisi komentar!'),
  });

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
      showToast('Silahkan login dahulu!', 'info');
    };

  // function to handle add comment for a book
  const handleAddCommentBook: HandleBookCommentFunction['handleAddCommentBook'] =
    (review: AddCommentValues) => {
      try {
        firestore()
          .collection('ulasan')
          .add(review)
          .then(() => {
            showToast('Komentar Terkirim', 'success');
          });
      } catch (error) {
        toast.show({
          placement: 'bottom',
          duration: 2000,
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action="error" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Komentar Gagal dikirim </ToastTitle>
                </VStack>
              </Toast>
            );
          },
        });
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
            toast.show({
              placement: 'bottom',
              duration: 2000,
              render: ({id}: ToastRenderProps) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} action="success" variant="solid">
                    <VStack space="xs">
                      <ToastTitle>Berhasil menghapus komentar</ToastTitle>
                    </VStack>
                  </Toast>
                );
              },
            });
          });
      } catch (error) {
        toast.show({
          placement: 'bottom',
          duration: 2000,
          render: ({id}: ToastRenderProps) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action="error" variant="solid">
                <VStack space="xs">
                  <ToastTitle>Gagal menghapus komentar</ToastTitle>
                </VStack>
              </Toast>
            );
          },
        });
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
              toast.show({
                placement: 'bottom',
                duration: 2000,
                render: ({id}: ToastRenderProps) => {
                  const toastId = 'toast-' + id;
                  return (
                    <Toast nativeID={toastId} action="success" variant="solid">
                      <VStack space="xs">
                        <ToastTitle>Berhasil memperbarui komentar</ToastTitle>
                      </VStack>
                    </Toast>
                  );
                },
              });
            });

          setIsEdit(false);
        } catch (error) {
          toast.show({
            placement: 'bottom',
            duration: 2000,
            render: ({id}: ToastRenderProps) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} action="error" variant="solid">
                  <VStack space="xs">
                    <ToastTitle>Gagal memperbarui komentar</ToastTitle>
                  </VStack>
                </Toast>
              );
            },
          });
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
          toast.show({
            placement: 'bottom',
            duration: 2000,
            render: ({id}: ToastRenderProps) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} action="info" variant="solid">
                  <VStack space="xs">
                    <ToastTitle>Gagal mengambil id!</ToastTitle>
                  </VStack>
                </Toast>
              );
            },
          });
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
      commentSchema={commentSchema}
      initialValues={initialValues}
      isLogin={isLogin}
      user={user}
      detailBook={detailBook}
      commentBook={commentBook}
    />
  );
};

export default CommentContainer;

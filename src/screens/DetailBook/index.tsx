import {
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
  View,
  Image,
  VStack,
  AvatarFallbackText,
  Box,
  Avatar,
  AvatarImage,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Icon,
  ModalBody,
  ModalFooter,
  Modal,
  CloseIcon,
  Textarea,
  TextareaInput,
  useToast,
  Toast,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import {Review, RootStackParamList} from '../../types/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  detailBookSelector,
  typeBookSelector,
  useReviewBookSelector,
} from '../../redux/book/bookSelector';
import {modifiedName} from '../../../utils/const/const';
import {retrieveDetailBook} from '../../redux/book/bookThunk';
import React from 'react';
import {ToastTitle} from '@gluestack-ui/themed';
import WebView from 'react-native-webview';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import {
  useIsLoginSelector,
  useUserSelector,
} from '../../redux/user/userSelector';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {retrieveReviewBook} from '../../redux/book/bookSlice';

type DetailBooksRouteProp = RouteProp<RootStackParamList, 'DetailBook'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface MyFormValues {
  review: string;
}

interface addReviewValues {
  userName: string;
  bookId: string;
  profilePic: string;
  id: string;
  ulasan: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const DetailBook = () => {
  const route = useRoute<DetailBooksRouteProp>();
  const dispatch = useAppDispatch();

  const detailBook = useAppSelector(detailBookSelector);
  const user = useAppSelector(useUserSelector);
  const isLogin = useAppSelector(useIsLoginSelector);
  const bookReview = useAppSelector(useReviewBookSelector);
  const typeBook = useAppSelector(typeBookSelector);

  const {bookId} = route.params;
  const toast = useToast();
  const navigation = useNavigation<NavigationProp>();

  const [showBook, setShowBook] = useState(false);
  const refReadBook = React.useRef(null);

  const isReview = (data: any): data is Review => {
    return (
      data &&
      typeof data.bookId === 'string' &&
      typeof data.createdAt === 'string' &&
      typeof data.id === 'string' &&
      typeof data.profilePic === 'string' &&
      typeof data.ulasan === 'string' &&
      typeof data.updatedAt === 'string' &&
      typeof data.userId === 'string' &&
      typeof data.userName === 'string'
    );
  };

  useEffect(() => {
    dispatch(retrieveDetailBook({bookId: bookId}));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ulasan')
      .where('bookId', '==', bookId)
      .onSnapshot(querySnapshot => {
        const reviews: Review[] = querySnapshot.docs
          .map(doc => doc.data())
          .filter(isReview);
        dispatch(retrieveReviewBook(reviews));
      });

    return () => unsubscribe();
  }, [bookId, dispatch]);

  const authorsName = modifiedName(detailBook?.volumeInfo.authors);
  const categories = modifiedName(detailBook?.volumeInfo.categories);

  const isbn = parseInt(
    detailBook.volumeInfo.industryIdentifiers[0].identifier,
  );

  const initialValues: MyFormValues = {review: ''};

  const reviewSchema = Yup.object().shape({
    review: Yup.string()
      .min(10, 'Minimal 10 karakter')
      .max(200, 'Maximal 100 karakter')
      .required('Mohon mengisi komentar!'),
  });

  const addReviewBook = (review: addReviewValues) => {
    try {
      firestore()
        .collection('ulasan')
        .add(review)
        .then(() => {
          toast.show({
            placement: 'bottom',
            duration: 2000,
            render: ({id}) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} action="success" variant="solid">
                  <VStack space="xs">
                    <ToastTitle>Komentar Terkirim</ToastTitle>
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

  const handleNavigateUserNotLogin = () => {
    navigation.navigate('Login');

    toast.show({
      placement: 'bottom',
      duration: 2000,
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="info" variant="solid">
            <VStack space="xs">
              <ToastTitle>Silahkan login dahulu!</ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const uriDetailBook =
    detailBook.volumeInfo.imageLinks &&
    detailBook.volumeInfo?.imageLinks?.thumbnail
      ? detailBook.volumeInfo?.imageLinks?.thumbnail
      : 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const loading = typeBook === retrieveDetailBook.pending.type;

  if (loading) return <Text>Loading</Text>;

  return (
    <ScrollView>
      <View display="flex" alignItems="center" padding={20}>
        <Image
          alt="title"
          width={250}
          h={340}
          borderRadius={10}
          source={{
            uri: uriDetailBook,
          }}
        />

        <View display="flex" flexDirection="row" gap={10} marginTop={10}>
          <Button onPress={() => setShowBook(true)} ref={refReadBook}>
            <ButtonText>Baca Buku</ButtonText>
          </Button>
        </View>

        <View alignItems="center" marginTop={10}>
          <View alignItems="center">
            <Heading size="md">Author:</Heading>
            <Text>
              {authorsName !== null ? authorsName : 'Penulis tidak diketahui'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Publisher:</Heading>
            <Text>
              {detailBook.volumeInfo.publisher !== null || undefined
                ? detailBook.volumeInfo.publisher
                : 'Penerbit tidak diketahui'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Published Date:</Heading>
            <Text>
              {detailBook.volumeInfo.publishedDate !== null || undefined
                ? detailBook.volumeInfo.publishedDate
                : 'Tanggal publikasi tidak diketahui'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Page Count:</Heading>
            <Text>
              {detailBook.volumeInfo.pageCount !== null || undefined
                ? detailBook.volumeInfo.pageCount
                : 'Jumlah halaman tidak diketahui'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Category:</Heading>
            <Text>
              {(categories !== undefined && categories.length !== 0) ||
              null ||
              undefined
                ? categories
                : 'Kategori tidak diketahui'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Description:</Heading>
            <Text>
              {detailBook.volumeInfo.description !== null || undefined
                ? detailBook.volumeInfo.description
                : 'Deksripsi tidak diketahui'}
            </Text>
          </View>
        </View>
      </View>

      <View padding={20}>
        <View>
          <Heading>Komentar</Heading>
          <Formik
            validationSchema={reviewSchema}
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
              const date = new Date();
              const id = uuidv4();

              addReviewBook({
                userName: user.name,
                bookId: detailBook.id,
                profilePic: user.photo,
                id: id,
                ulasan: values.review,
                userId: user.id,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
              });

              resetForm();
            }}>
            {({handleChange, handleSubmit, values}) => (
              <View>
                <Textarea
                  size="sm"
                  isRequired={true}
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}>
                  <TextareaInput
                    placeholder="Tuliskan komentar anda..."
                    onChangeText={handleChange('review')}
                    value={values.review}
                    fontSize={'$sm'}
                    maxLength={200}
                  />
                </Textarea>

                <Button
                  size="sm"
                  width={'$1/4'}
                  action="positive"
                  marginVertical={10}
                  isDisabled={values.review.length < 10 ? true : false}
                  onPress={() =>
                    isLogin ? handleSubmit() : handleNavigateUserNotLogin()
                  }>
                  <ButtonText>Kirim</ButtonText>
                </Button>
              </View>
            )}
          </Formik>
        </View>
        {bookReview.length !== 0 ? (
          bookReview.map(book => {
            return (
              <Box display="flex" flexDirection="row" mt={10} key={book.id}>
                <Avatar mr="$3">
                  <AvatarFallbackText fontFamily="$heading">
                    Picture
                  </AvatarFallbackText>
                  <AvatarImage
                    alt="gambar"
                    source={{
                      uri: book.profilePic
                        ? book.profilePic
                        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                    }}
                  />
                </Avatar>
                <VStack flex={1}>
                  <Box display="flex">
                    <Heading size="sm" fontFamily="$heading" mb={1}>
                      {book.userName}
                    </Heading>
                    <Text size="xs">{book.createdAt}</Text>
                  </Box>

                  <Text size="sm" color="black">
                    {book.ulasan}
                  </Text>
                </VStack>
              </Box>
            );
          })
        ) : (
          <Text>Tidak ada komentar</Text>
        )}
      </View>

      {showBook && (
        <ScrollView>
          <Modal
            size="lg"
            padding={0}
            isOpen={showBook}
            onClose={() => {
              setShowBook(false);
            }}
            finalFocusRef={refReadBook}>
            <ModalBackdrop />
            <ModalContent>
              <ModalBody marginTop={8}>
                <WebView
                  originWhitelist={['*']}
                  style={{width: 'auto', height: 500}}
                  source={{
                    html: `
                        <meta name="viewport" content="width=device-width">
                        <script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script>
                        <script type="text/javascript">
                          google.books.load();

                          function alertNotFound() {
                            alert("Buku tidak dapat dibaca!");
                          }

                          function initialize() {
                            var viewer = new google.books.DefaultViewer(
                              document.getElementById('viewerCanvas'),
                            );
                            viewer.load('ISBN:${isbn}', alertNotFound);
                          }

                          google.books.setOnLoadCallback(initialize);
                        </script>

                        <body>
                        <div id="viewerCanvas" style="width: 500px; height: 860px"></div>
                      </body>
                      `,
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default DetailBook;

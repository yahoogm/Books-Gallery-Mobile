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
} from '@gluestack-ui/themed';
import {RootStackParamList} from '../../types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {detailBookSelector} from '../../redux/book/bookSelector';
import {modifiedName} from '../../../utils/const/const';
import {retrieveDetailBook} from '../../redux/book/bookThunk';
import React from 'react';
import {ToastTitle} from '@gluestack-ui/themed';
import WebView from 'react-native-webview';

type DetailBooksRouteProp = RouteProp<RootStackParamList, 'DetailBook'>;

const DetailBook = () => {
  const route = useRoute<DetailBooksRouteProp>();
  const dispatch = useAppDispatch();
  const detailBook = useAppSelector(detailBookSelector);

  const {bookId} = route.params;
  const toast = useToast();

  const [showModal, setShowModal] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const refComment = React.useRef(null);
  const refReadBook = React.useRef(null);

  useEffect(() => {
    dispatch(retrieveDetailBook({bookId: bookId}));
  }, [bookId, dispatch]);

  const authorsName = modifiedName(detailBook?.volumeInfo.authors);
  const categories = modifiedName(detailBook?.volumeInfo.categories);

  const isbn = parseInt(
    detailBook.volumeInfo.industryIdentifiers[0].identifier,
  );

  const alertNotFound = () => {
    toast.show({
      placement: 'top right',
      duration: 2000,
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Buku tidak dapat dibaca</ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <ScrollView>
      <View display="flex" alignItems="center" padding={20}>
        <Image
          alt="title"
          width={250}
          h={340}
          borderRadius={10}
          source={{
            uri: detailBook.volumeInfo.imageLinks.thumbnail
              ? detailBook.volumeInfo.imageLinks.thumbnail
              : 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />

        <View display="flex" flexDirection="row" gap={10} marginTop={10}>
          <Button onPress={() => setShowBook(true)} ref={refReadBook}>
            <ButtonText>Baca Buku</ButtonText>
          </Button>

          <Button onPress={() => setShowModal(true)} ref={refComment}>
            <ButtonText>Tambahkan Komentar</ButtonText>
          </Button>
          <Modal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            finalFocusRef={refComment}>
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Tambahkan Komentar</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  size="md"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}>
                  <TextareaInput placeholder="Tuliskan komentar anda..." />
                </Textarea>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <ButtonText>Batal</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <ButtonText>Kirim</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
        </View>

        <Box display="flex" flexDirection="row" mt={10}>
          <Avatar mr="$3">
            <AvatarFallbackText fontFamily="$heading">RR</AvatarFallbackText>
            <AvatarImage
              alt="gambar"
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
              }}
            />
          </Avatar>
          <VStack flex={1}>
            <Box display="flex">
              <Heading size="sm" fontFamily="$heading" mb={1}>
                John Smith
              </Heading>
              <Text size="xs">2024-06-02 13:32:21</Text>
            </Box>

            <Text size="sm" color="black"></Text>
          </VStack>
        </Box>
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
                            viewer.load('ISBN:qwdqdq', alertNotFound);
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

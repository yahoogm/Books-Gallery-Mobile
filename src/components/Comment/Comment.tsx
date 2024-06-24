import {
  Button,
  ButtonText,
  Heading,
  Text,
  View,
  VStack,
  AvatarFallbackText,
  Box,
  Avatar,
  AvatarImage,
  ModalBackdrop,
  ModalContent,
  Icon,
  Modal,
  Textarea,
  TextareaInput,
  GripVerticalIcon,
  Menu,
  MenuItem,
  MenuItemLabel,
  EditIcon,
  TrashIcon,
  ButtonIcon,
  ModalFooter,
  ModalHeader,
} from '@gluestack-ui/themed';
import {Formik} from 'formik';
import {v4 as uuidv4} from 'uuid';
import {CommentProps} from './types';

const Comment: React.FC<CommentProps> = ({
  refOpenDeleteModal,
  deleteModal,
  setDeleteModal,
  handleButton,
  isEdit,
  setIsEdit,
  commentSchema,
  initialValues,
  isLogin,
  user,
  detailBook,
  commentBook,
}) => {
  const {
    handleNavigateUserNotLogin,
    handleAddCommentBook,
    handleUpdateCommentBook,
    handleDeleteCommentBook,
    getIdDocumentFromFirestore,
  } = handleButton;
  return (
    <View>
      <Heading>Komentar</Heading>
      <Formik
        validationSchema={commentSchema}
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
          const date = new Date();
          const id = uuidv4();

          isEdit
            ? handleUpdateCommentBook(values.comment, date.toISOString())
            : handleAddCommentBook({
                userName: user.name,
                bookId: detailBook.id,
                profilePic: user.photo,
                id: id,
                ulasan: values.comment,
                userId: user.id,
                createdAt: date.toISOString(),
                updatedAt: date.toISOString(),
              });

          resetForm();
        }}>
        {({handleChange, handleSubmit, values, setFieldValue}) => (
          <View>
            <Textarea
              size="sm"
              isRequired={true}
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}>
              <TextareaInput
                placeholder="Ketikkan komentar anda..."
                onChangeText={handleChange('comment')}
                value={values.comment}
                fontSize={'$sm'}
                maxLength={200}
              />
            </Textarea>

            <View display="flex" flexDirection="row" gap={4}>
              <Button
                size="sm"
                width={'$1/4'}
                action="positive"
                marginVertical={10}
                isDisabled={values.comment.length < 10 ? true : false}
                onPress={() =>
                  isLogin ? handleSubmit() : handleNavigateUserNotLogin()
                }>
                <ButtonText>{isEdit ? 'Edit' : 'Kirim'}</ButtonText>
              </Button>

              {isEdit && (
                <Button
                  size="sm"
                  width={'$1/4'}
                  action="positive"
                  marginVertical={10}
                  onPress={() => {
                    setIsEdit(false);
                    setFieldValue('comment', '');
                  }}>
                  <ButtonText>Batal</ButtonText>
                </Button>
              )}
            </View>

            {commentBook.length !== 0 ? (
              commentBook.map(book => {
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

                    <VStack>
                      {user.id === book.userId && (
                        <Menu
                          placement="left bottom"
                          backgroundColor="$coolGray200"
                          width={'$full'}
                          margin={0}
                          padding={0}
                          trigger={({...triggerProps}) => {
                            return (
                              <Button
                                {...triggerProps}
                                w="$1"
                                backgroundColor="white">
                                <ButtonIcon
                                  as={GripVerticalIcon}
                                  color="black"
                                />
                              </Button>
                            );
                          }}>
                          <MenuItem
                            key="Edit"
                            textValue="Edit"
                            onPress={() => {
                              getIdDocumentFromFirestore(book.id);
                              setFieldValue('review', book.ulasan);
                              setIsEdit(true);
                            }}>
                            <Icon as={EditIcon} mr={'$2'} color="green" />
                            <MenuItemLabel color="green">Edit</MenuItemLabel>
                          </MenuItem>

                          <MenuItem
                            key="Hapus"
                            textValue="Hapus"
                            onPress={() => {
                              setDeleteModal(true);
                              getIdDocumentFromFirestore(book.id);
                            }}
                            ref={refOpenDeleteModal}>
                            <Icon as={TrashIcon} mr={'$2'} color="red" />
                            <MenuItemLabel color="red">Hapus</MenuItemLabel>
                          </MenuItem>
                        </Menu>
                      )}

                      <Modal
                        isOpen={deleteModal}
                        onClose={() => {
                          setDeleteModal(false);
                        }}
                        finalFocusRef={refOpenDeleteModal}>
                        <ModalBackdrop />
                        <ModalContent>
                          <ModalHeader>
                            <Heading size="lg">
                              Yakin ingin menghapus komentar?
                            </Heading>
                          </ModalHeader>
                          <ModalFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              action="secondary"
                              mr="$3"
                              onPress={() => {
                                setDeleteModal(false);
                              }}>
                              <ButtonText>Batal</ButtonText>
                            </Button>
                            <Button
                              size="sm"
                              action="negative"
                              borderWidth="$0"
                              onPress={() => {
                                setDeleteModal(false);
                                handleDeleteCommentBook();
                              }}>
                              <ButtonText>Hapus</ButtonText>
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </VStack>
                  </Box>
                );
              })
            ) : (
              <Text>Tidak ada komentar</Text>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Comment;

import {act, fireEvent, render} from '@testing-library/react-native';
import {CommentProps} from '../types';
import Comment from '../Comment';
import {createRef} from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

describe('Comment', () => {
  const refOpenDeleteModal = createRef<any>();
  const mockSetDeleteModal = jest.fn();
  const mockHandleButton = {
    handleNavigateUserNotLogin: jest.fn(),
    handleAddCommentBook: jest.fn(),
    handleDeleteCommentBook: jest.fn(),
    handleUpdateCommentBook: jest.fn(),
    getIdDocumentFromFirestore: jest.fn(),
    handleSubmit: jest.fn(),
  };
  const mockSetIsEdit = jest.fn();

  const renderComponent = (props: CommentProps) =>
    render(
      <GluestackUIProvider config={config}>
        <Comment {...props} />
      </GluestackUIProvider>,
    );

  it('match snapshot when renders and given props', () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      createdAt: 'testing',
      email: 'testing',

      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'berhasil'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const instance = tree.toJSON();
    expect(instance).toMatchSnapshot();
  });

  it('renders correctly if comment value same with props', async () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      createdAt: 'testing',
      email: 'testing',

      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const instance = tree.getByTestId('testCommentTextArea');

    await act(async () => {
      fireEvent.changeText(instance, 'testing');
    });

    expect(instance.props.value).toBe('testing');
  });

  it('should disable submit button if comment length is less than 10 characters', async () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',

      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const input = tree.getByTestId('testCommentTextArea');
    const button = tree.getByTestId('testButtonSubmit');

    expect(button.props.states.disabled).toBe(true);

    await act(async () => fireEvent.changeText(input, 'testing'));

    expect(button.props.states.disabled).toBe(true);

    await act(async () =>
      fireEvent.changeText(input, 'testing to make button isDisable false'),
    );

    expect(button.props.states.disabled).toBe(false);
  });

  it('should call handleSubmit when the button is pressed and isLogin true', async () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',
      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const input = tree.getByTestId('testCommentTextArea');
    const button = tree.getByTestId('testButtonSubmit');

    await act(() =>
      fireEvent.changeText(input, 'testing for handle submit button pressed'),
    );
    expect(button.props.states.disabled).toBe(false);

    await act(() => fireEvent.press(button));
    expect(mockHandleButton.handleNavigateUserNotLogin).toHaveBeenCalled();
  });

  it('should render button text kirim if isEdit props false', async () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      createdAt: 'testing',
      email: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const button = tree.getByTestId('testButtonTextSubmit');

    expect(button.props.children).toBe('Submit');
  });

  it('should render button text edit if isEdit props true', async () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',
      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: true,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const button = tree.getByTestId('testButtonTextSubmit');

    expect(button.props.children).toBe('Edit');
  });

  it('should render component button when props isEdit true', () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      createdAt: 'testing',
      email: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: true,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const cancelButton = tree.getByTestId('testCancelEditButton');
    expect(cancelButton).toBeDefined();
  });

  it('should not render component button when props isEdit false', () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',

      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: false,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: false,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const cancelButton = tree.queryByTestId('testCancelEditButton');
    expect(cancelButton).toBeNull();
  });

  it('should call setIsEdit when button pressed', () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',

      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: true,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: true,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const cancelButton = tree.getByTestId('testCancelEditButton');
    fireEvent.press(cancelButton);
    expect(props.setIsEdit).toHaveBeenCalledWith(false);
  });

  it('should render component comment when comment book length !== 0', () => {
    const userItem = {
      email: 'testing@gmail.com',
      familyName: 'test',
      givenName: 'ing',
      id: '12345',
      name: 'testing',
      photo: 'https://google.com',
    };
    const volumenInfo = {
      title: 'testing',
      publishedDate: 'testing',
      description: 'testing',
      authors: ['testing', 'testing'],
      publisher: 'testing',
      pageCount: 100,
      imageLinks: {
        smallThumbnail: 'https://google.com',
        thumbnail: 'https://google.com',
        large: 'https://google.com',
      },
      categories: ['testing', 'testing'],
      industryIdentifiers: [{identifier: 'testing', type: 'testing'}],
    };
    const bookItem = {
      id: '123456',
      volumeInfo: volumenInfo,
    };

    const comment = {
      bookId: 'testing',
      email: 'testing',

      createdAt: 'testing',
      id: 'testing',
      profilePic: 'https://google.com',
      ulasan: 'testing',
      updatedAt: 'testing',
      userId: 'testing',
      userName: 'testing',
    };

    const props = {
      refOpenDeleteModal: refOpenDeleteModal,
      deleteModal: false,
      setDeleteModal: mockSetDeleteModal,
      handleButton: mockHandleButton,
      isEdit: true,
      setIsEdit: mockSetIsEdit,
      initialValues: {comment: 'testing'},
      isLogin: true,
      user: userItem,
      detailBook: bookItem,
      commentBook: [comment],
    };

    const tree = renderComponent(props);
    const commentContainer = tree.queryByTestId('tesCommentBookContainer');
    expect(commentContainer).toBeDefined();
  });
});

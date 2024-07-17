import React, {createRef} from 'react';
import renderer from 'react-test-renderer';
import {Button} from '@gluestack-ui/themed';
import Book from './Book';

const mockDetailBook = {
  volumeInfo: {
    title: 'Test Title',
    publishedDate: '2024-01-01',
    description: 'Test Description',
    authors: ['Author One', 'Author Two'],
    publisher: 'Test Publisher',
    pageCount: 123,
    imageLinks: {
      smallThumbnail: 'http://example.com/small.jpg',
      thumbnail: 'http://example.com/thumbnail.jpg',
    },
    categories: ['Category One', 'Category Two'],
    industryIdentifiers: [
      {identifier: '1234567890', type: 'ISBN_10'},
      {identifier: '1234567890123', type: 'ISBN_13'},
    ],
  },
};

describe('BookComponent', () => {
  it('renders corretly when given props', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();
    const tree = renderer
      .create(
        <Book
          authorsName={['budiono siregar', 'ucup']}
          categories={['buku', 'catatan']}
          detailBook={mockDetailBook}
          refReadBook={refReadBook}
          setShowBook={mockSetShowBook}
          uriDetailBook="https://google.com/test"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls setShowBook when button pressed', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();

    const testRenderer = renderer.create(
      <Book
        authorsName={['budiono siregar', 'ucup']}
        categories={['buku', 'catatan']}
        detailBook={mockDetailBook}
        refReadBook={refReadBook}
        setShowBook={mockSetShowBook}
        uriDetailBook="https://google.com/test"
      />,
    );
    const testInstance = testRenderer.root;
    const button = testInstance.findByType(Button);
    button.props.onPress();

    expect(mockSetShowBook).toHaveBeenCalledWith(true);
    expect(refReadBook.current).toBeTruthy();
  });
});

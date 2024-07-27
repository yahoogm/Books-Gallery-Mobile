import React, {createRef} from 'react';
import {render} from '@testing-library/react-native';
import {Button} from '@gluestack-ui/themed';
import Book from './Book';
import {BookProps} from './types';
import {modifiedName} from '../../utils/const/const';

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
  const rendererComponent = (props: BookProps) => render(<Book {...props} />);

  // snapshot test
  it('match snapshot when given props', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();
    const props = {
      authorsName: ['budiono siregar', 'ucup'],
      categories: ['buku', 'catatan'],
      detailBook: mockDetailBook,
      refReadBook: refReadBook,
      setShowBook: mockSetShowBook,
      uriDetailBook: 'https://google.com/test',
    };

    const tree = rendererComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // assertion test
  it('calls setShowBook when button pressed', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();

    const props = {
      authorsName: ['budiono siregar', 'ucup'],
      categories: ['buku', 'catatan'],
      detailBook: mockDetailBook,
      refReadBook: refReadBook,
      setShowBook: mockSetShowBook,
      uriDetailBook: 'https://google.com/test',
    };

    const tree = rendererComponent(props);
    const testInstance = tree.root;
    const button = testInstance.findByType(Button);
    button.props.onPress();

    expect(mockSetShowBook).toHaveBeenCalledWith(true);
    expect(refReadBook.current).toBeTruthy();
  });

  it('renders correctry when given props', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();
    const names = modifiedName(['budiono siregar', 'ucup']);
    const categories = modifiedName(['buku', 'catatan']);

    const props = {
      authorsName: names,
      categories: categories,
      detailBook: mockDetailBook,
      refReadBook: refReadBook,
      setShowBook: mockSetShowBook,
      uriDetailBook: 'https://google.com/test',
    };

    const tree = rendererComponent(props);
    const instance = tree.root;

    expect(
      instance.findByProps({children: 'budiono siregar, ucup'}),
    ).toBeTruthy();
    expect(instance.findByProps({children: 'buku, catatan'})).toBeTruthy();
  });
});

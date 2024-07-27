import React, {createRef} from 'react';
import ReadBook from '../ReadBook';
import {ReadBookProps} from '../types';
import {render} from '@testing-library/react-native';

jest.mock('react-native-webview');

describe('Read Book', () => {
  const renderComponent = (props: ReadBookProps) =>
    render(<ReadBook {...props} />);

  it('match snapshot when given props', () => {
    const refReadBook = createRef<any>();
    const mockSetShowBook = jest.fn();
    const props = {
      refReadBook: refReadBook,
      setShowBook: mockSetShowBook,
      showBook: false,
      isbn: 2020400192,
    };

    const tree = renderComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should not display the modal when showBook is false', () => {
    const refReadBook = createRef<any>();
    const mockSetShowBook = jest.fn();
    const props = {
      refReadBook: refReadBook,
      setShowBook: mockSetShowBook,
      showBook: false,
      isbn: 2020400192,
    };

    const tree = renderComponent(props);
    const instance = tree.queryByTestId('modalEmbeddedBook');

    expect(instance).toBeNull();
  });
});

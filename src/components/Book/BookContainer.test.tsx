import React, {createRef} from 'react';
import renderer from 'react-test-renderer';
import BookContainer from './BookContainer';
import {Provider} from 'react-redux';
import {Store} from '../../redux/store';

describe('BookContainerComponent', () => {
  it('renders corretly when given props', () => {
    const mockSetShowBook = jest.fn();
    const refReadBook = createRef<any>();
    const tree = renderer
      .create(
        <Provider store={Store}>
          <BookContainer
            refReadBook={refReadBook}
            setShowBook={mockSetShowBook}
          />
          ,
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

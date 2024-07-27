import {createRef} from 'react';
import {render} from '@testing-library/react-native';
import ReadBookContainer from '../ReadBookContainer';

describe('Read Book Container', () => {
  it('match snapshot when renders', () => {
    const refReadBook = createRef<any>();
    const mockSetShowBook = jest.fn();

    const renderComponent = render(
      <ReadBookContainer
        refReadBook={refReadBook}
        setShowBook={mockSetShowBook}
        isbn={2020400192}
        showBook={false}
      />,
    );

    const tree = renderComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

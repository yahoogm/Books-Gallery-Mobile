import {render} from '@testing-library/react-native';
import ToastAlert from '../ToastAlert';

describe('Toast Alert', () => {
  it('match snapshot when given props', () => {
    const tree = render(
      <ToastAlert action="attention" id="1234" message="testing" />,
    );

    const instance = tree.toJSON();
    expect(instance).toMatchSnapshot();
  });
});

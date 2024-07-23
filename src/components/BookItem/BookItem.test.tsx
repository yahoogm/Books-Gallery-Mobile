import BookItem from './BookItem';
import renderer from 'react-test-renderer';
import {BookItemProps} from './types';
import {modifiedName} from '../../utils/const/const';

describe('BookItem component', () => {
  const rendererComponent = (props: BookItemProps) =>
    renderer.create(<BookItem {...props} />);

  //   snapshoot test
  it('match snapshot with string detail book', () => {
    const props: BookItemProps = {
      detailBook: 'this book is very nice',
      label: 'Description',
    };
    const tree = rendererComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('match snapshot with number detail book', () => {
    const props: BookItemProps = {
      detailBook: 123456,
      label: 'Page Count',
    };

    const tree = rendererComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('match snapshot with string in array detail book', () => {
    const props: BookItemProps = {
      detailBook: ['budi', 'tono'],
      label: 'Publisher',
    };

    const tree = rendererComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //   assertion test
  it('renders correctly with string detail book', () => {
    const props: BookItemProps = {
      detailBook: 'this book is very nice',
      label: 'Description',
    };

    const component = rendererComponent(props);
    const instance = component.root;

    expect(instance.findByProps({children: 'Description:'})).toBeTruthy();
    expect(
      instance.findByProps({children: 'this book is very nice'}),
    ).toBeTruthy();
  });

  it('renders correctly with number detail book', () => {
    const props: BookItemProps = {
      detailBook: 1234567,
      label: 'Page Count',
    };

    const component = rendererComponent(props);
    const instance = component.root;

    expect(instance.findByProps({children: 'Page Count:'})).toBeTruthy();
    expect(instance.findByProps({children: 1234567})).toBeTruthy();
  });

  it('renders correctly with string in array detail book', () => {
    const items = modifiedName(['budi', 'tono']);
    const props: BookItemProps = {
      detailBook: items,
      label: 'Publisher',
    };

    const component = rendererComponent(props);
    const instance = component.root;

    expect(instance.findByProps({children: 'Publisher:'})).toBeTruthy();
    expect(instance.findByProps({children: 'budi, tono'})).toBeTruthy();
  });
});

import {Heading, Text, View} from '@gluestack-ui/themed';
import {BookItemProps} from './types';
const BookItem: React.FC<BookItemProps> = ({detailBook, label}) => {
  return (
    <View alignItems="center">
      <Heading size="md">{label}:</Heading>
      <Text>{detailBook}</Text>
    </View>
  );
};

export default BookItem;

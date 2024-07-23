import React from 'react';
import {BookItemProps} from './types';
import {Heading, Text, View} from '@gluestack-ui/themed';

const BookItem: React.FC<BookItemProps> = ({detailBook, label}) => {
  return (
    <View alignItems="center">
      <Heading size="md">{`${label}:`}</Heading>
      <Text>{detailBook}</Text>
    </View>
  );
};

export default BookItem;

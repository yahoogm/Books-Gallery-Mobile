import React from 'react';
import {BookProps} from './types';
import BookItem from '../BookItem/BookItem';
import {Button, ButtonText, View, Image} from '@gluestack-ui/themed';

const Book: React.FC<BookProps> = ({
  uriDetailBook,
  authorsName,
  categories,
  detailBook,
  setShowBook,
  refReadBook,
}) => {
  return (
    <View display="flex" alignItems="center" padding={20}>
      <Image
        alt="title"
        width={250}
        h={340}
        borderRadius={10}
        source={{
          uri: uriDetailBook,
        }}
      />

      <View display="flex" flexDirection="row" gap={10} marginTop={10}>
        <Button onPress={() => setShowBook(true)} ref={refReadBook}>
          <ButtonText>Read Book</ButtonText>
        </Button>
      </View>

      <View alignItems="center" marginTop={10}>
        <BookItem
          detailBook={
            detailBook.volumeInfo.title !== undefined || null || ''
              ? detailBook.volumeInfo.title
              : 'Title not found'
          }
          label="Title"
        />
        <BookItem
          detailBook={
            authorsName !== undefined || null || ''
              ? authorsName
              : 'Author not found'
          }
          label="Author"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.publisher !== undefined || null || ''
              ? detailBook.volumeInfo.publisher
              : 'Publisher not found'
          }
          label="Publisher"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.publishedDate !== undefined || null || ''
              ? detailBook.volumeInfo.publishedDate
              : 'Published date not found'
          }
          label="Published Date"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.pageCount !== undefined || 0
              ? detailBook.volumeInfo.pageCount
              : 'Page count not found'
          }
          label="Page Count"
        />
        <BookItem
          detailBook={
            categories.length !== 0 || undefined
              ? categories
              : 'Category not found'
          }
          label="Category"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.description !== undefined || null || ''
              ? detailBook.volumeInfo.description
              : 'Description not found'
          }
          label="Description"
        />
      </View>
    </View>
  );
};

export default Book;

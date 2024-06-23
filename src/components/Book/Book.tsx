import {Button, ButtonText, View, Image} from '@gluestack-ui/themed';
import {BookProps} from './types';
import BookItem from '../BookItem/BookItem';

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
          <ButtonText>Baca Buku</ButtonText>
        </Button>
      </View>

      <View alignItems="center" marginTop={10}>
        <BookItem
          detailBook={
            authorsName !== null || undefined
              ? authorsName
              : 'Penulis tidak diketahui'
          }
          label="Author"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.publisher !== null || undefined
              ? detailBook.volumeInfo.publisher
              : 'Penerbit tidak diketahui'
          }
          label="Publisher"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.publishedDate !== null || undefined
              ? detailBook.volumeInfo.publishedDate
              : 'Waktu diterbitkan tidak diketahui'
          }
          label="Published Date"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.pageCount !== null || undefined
              ? detailBook.volumeInfo.pageCount
              : 'Jumlah halaman tidak diketahui'
          }
          label="Page Count"
        />
        <BookItem
          detailBook={
            categories !== null || undefined
              ? categories
              : 'Kategori tidak diketahui'
          }
          label="Category"
        />
        <BookItem
          detailBook={
            detailBook.volumeInfo.description !== null || undefined
              ? detailBook.volumeInfo.description
              : 'Deskripsi tidak diketahui'
          }
          label="Description"
        />
        {/* <View alignItems="center">
          <Heading size="md">Author:</Heading>
          <Text>
            {authorsName !== null ? authorsName : 'Penulis tidak diketahui'}
          </Text>
        </View>
        <View alignItems="center">
          <Heading size="md">Publisher:</Heading>
          <Text>
            {detailBook.volumeInfo.publisher !== null || undefined
              ? detailBook.volumeInfo.publisher
              : 'Penerbit tidak diketahui'}
          </Text>
        </View>
        <View alignItems="center">
          <Heading size="md">Published Date:</Heading>
          <Text>
            {detailBook.volumeInfo.publishedDate !== null || undefined
              ? detailBook.volumeInfo.publishedDate
              : 'Tanggal publikasi tidak diketahui'}
          </Text>
        </View>
        <View alignItems="center">
          <Heading size="md">Page Count:</Heading>
          <Text>
            {detailBook.volumeInfo.pageCount !== null || undefined
              ? detailBook.volumeInfo.pageCount
              : 'Jumlah halaman tidak diketahui'}
          </Text>
        </View>
        <View alignItems="center">
          <Heading size="md">Category:</Heading>
          <Text>
            {(categories !== undefined && categories.length !== 0) ||
            null ||
            undefined
              ? categories
              : 'Kategori tidak diketahui'}
          </Text>
        </View>
        <View alignItems="center">
          <Heading size="md">Description:</Heading>
          <Text>
            {detailBook.volumeInfo.description !== null || undefined
              ? detailBook.volumeInfo.description
              : 'Deksripsi tidak diketahui'}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default Book;

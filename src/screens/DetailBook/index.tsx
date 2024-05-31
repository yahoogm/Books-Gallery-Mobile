import {
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
  View,
  Image,
} from '@gluestack-ui/themed';
import {RootStackParamList} from '../../types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {detailBookSelector} from '../../redux/book/bookSelector';
import {modifiedName} from '../../../utils/const/const';
import {retrieveDetailBook} from '../../redux/book/bookThunk';

type DetailBooksRouteProp = RouteProp<RootStackParamList, 'DetailBook'>;

const DetailBook = () => {
  const route = useRoute<DetailBooksRouteProp>();
  const dispatch = useAppDispatch();
  const detailBook = useAppSelector(detailBookSelector);
  const {bookId} = route.params;

  useEffect(() => {
    dispatch(retrieveDetailBook({bookId: bookId}));
  }, []);

  const authorsName = modifiedName(detailBook?.volumeInfo.authors);
  const categories = modifiedName(detailBook?.volumeInfo.categories);

  return (
    <ScrollView>
      <View display="flex" alignItems="center" padding={20}>
        <Image
          alt="title"
          width={250}
          h={340}
          borderRadius={10}
          source={{
            uri: detailBook.volumeInfo.imageLinks.thumbnail
              ? detailBook.volumeInfo.imageLinks.thumbnail
              : 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />

        <View display="flex" flexDirection="row" gap={10} marginTop={10}>
          <Button>
            <ButtonText>Read Book</ButtonText>
          </Button>
          <Button>
            <ButtonText>Add Review</ButtonText>
          </Button>
        </View>

        <View alignItems="center" marginTop={10}>
          <View alignItems="center">
            <Heading size="md">Author:</Heading>
            <Text>
              {authorsName !== null ? authorsName : 'Penulis tidak ditemukan'}
            </Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Publisher:</Heading>
            <Text>{detailBook.volumeInfo.publisher}</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Published Date:</Heading>
            <Text>{detailBook.volumeInfo.publishedDate}</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Page Count:</Heading>
            <Text>{detailBook.volumeInfo.pageCount}</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Category:</Heading>
            <Text>{categories}</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Description:</Heading>
            <Text>{detailBook.volumeInfo.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailBook;

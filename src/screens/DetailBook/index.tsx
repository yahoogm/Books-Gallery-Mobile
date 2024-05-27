import {Text} from '@gluestack-ui/themed';
import {RootStackParamList} from '../../types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import axios from 'axios';

type DetailBooksRouteProp = RouteProp<RootStackParamList, 'DetailBook'>;

const DetailBook = () => {
  const route = useRoute<DetailBooksRouteProp>();
  const {bookId} = route.params;

  const getDetailBook = async () => {
    const req = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?=AIzaSyBSAX-msAaEmoJYIae3XsXuOx2oVr7Ta-I`,
    );

    const data = await req.data;
    console.log(data);

    return data;
  };

  useEffect(() => {
    getDetailBook();
  }, []);

  console.log(bookId);
  return <Text>oakwoawkoa</Text>;
};

export default DetailBook;

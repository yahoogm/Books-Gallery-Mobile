import {
  Button,
  ButtonText,
  Heading,
  Image,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
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
    console.log(data.volumeInfo.title);

    return data;
  };

  useEffect(() => {
    getDetailBook();
  }, []);

  console.log(bookId);
  return (
    <ScrollView>
      <View display="flex" alignItems="center" padding={20}>
        <Image
          alt="Image"
          size="2xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
            <Text>william</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Publisher:</Heading>
            <Text>william</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Published Date:</Heading>
            <Text>william</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Page Count:</Heading>
            <Text>william</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Category:</Heading>
            <Text>william</Text>
          </View>
          <View alignItems="center">
            <Heading size="md">Description:</Heading>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              officiis, sequi aliquid odio consequatur voluptate aut possimus!
              Aspernatur dolor architecto ab veniam accusamus tempore possimus
              nisi eveniet harum. Praesentium ipsam harum laboriosam quasi
              dolorum placeat non voluptates quidem, ducimus corrupti culpa
              repudiandae libero provident tenetur aspernatur possimus vero
              doloremque quod?
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailBook;

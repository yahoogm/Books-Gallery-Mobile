import {
  Input,
  Text,
  View,
  InputField,
  Button,
  ButtonText,
  HStack,
  Link,
  LinkText,
  Card,
  Heading,
  Image,
  Spinner,
} from '@gluestack-ui/themed';
import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {searchBooks, useSearchBookType} from '../../redux/book/bookSelector';
import {retrieveSearchBooks} from '../../redux/book/bookThunk';
import {BookItem, RootStackParamList} from '../../types/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailBook'
>;

const Content = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const books = useAppSelector(searchBooks);
  const type = useAppSelector(useSearchBookType);

  useEffect(() => {
    dispatch(retrieveSearchBooks({search: 'programming'}));
  }, [dispatch]);

  const loading = type === retrieveSearchBooks.pending.type;

  return (
    <HStack
      space="sm"
      reversed={false}
      flexDirection="column"
      alignItems="center"
      gap={20}
      marginTop={20}
      justifyContent="space-between"
      paddingHorizontal={15}>
      <View>
        <Image
          alt="image"
          size="2xl"
          borderRadius={10}
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />

        <HStack marginTop={5}>
          <Text size="xs" color="black">
            Buku yang tertera diambil dari{' '}
          </Text>
          <Link href="https://books.google.com/">
            <LinkText size="xs" color="black" bold={true} italic={true}>
              Google Books API{' '}
            </LinkText>
          </Link>
        </HStack>
      </View>

      <HStack flexDirection="row" width={'auto'} gap={10}>
        <Formik
          initialValues={{search: ''}}
          onSubmit={values =>
            dispatch(retrieveSearchBooks({search: values.search}))
          }>
          {({handleChange, handleSubmit, values}) => (
            <View flexDirection="row" gap={10}>
              <Input variant="outline" size="md" width={'$56'}>
                <InputField
                  placeholder="Ketikkan judul buku..."
                  size="xs"
                  color="black"
                  onChangeText={handleChange('search')}
                  value={values.search}
                />
              </Input>

              <Button onPress={() => handleSubmit()}>
                <ButtonText>Cari</ButtonText>
              </Button>
            </View>
          )}
        </Formik>
      </HStack>

      <HStack
        gap={10}
        marginBottom={20}
        justifyContent="space-between"
        flexWrap="wrap">
        {loading ? (
          <Spinner size={'large'} />
        ) : (
          books.items.map((item: BookItem) => {
            return (
              <Card borderRadius="$lg" maxWidth={160} key={item.id}>
                <Image
                  alt="title"
                  h={100}
                  width={140}
                  mb={4}
                  source={{
                    uri: item.volumeInfo.imageLinks
                      ? item.volumeInfo.imageLinks.thumbnail
                      : 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />

                <Heading
                  size="xs"
                  fontFamily="$mono"
                  mb={4}
                  textOverflow=""
                  isTruncated={true}>
                  {item.volumeInfo.title}
                </Heading>

                <Button
                  size="sm"
                  onPress={() =>
                    navigation.navigate('DetailBook', {bookId: item.id})
                  }>
                  <ButtonText>Detail</ButtonText>
                </Button>
              </Card>
            );
          })
        )}
      </HStack>
    </HStack>
  );
};

export default Content;

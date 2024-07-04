import {ScrollView, Text, View} from '@gluestack-ui/themed';
import {Comment, RootStackParamList} from '../../types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  detailBookSelector,
  typeBookSelector,
} from '../../redux/book/bookSelector';
import {retrieveDetailBook} from '../../redux/book/bookThunk';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {retrieveCommentBook} from '../../redux/book/bookSlice';
import BookContainer from '../../components/Book/BookContainer';
import CommentContainer from '../../components/Comment/CommentContainer';
import ReadBookContainer from '../../components/ReadBook/ReadBookContainer';

type DetailBooksRouteProp = RouteProp<RootStackParamList, 'DetailBook'>;

const DetailBook = () => {
  const route = useRoute<DetailBooksRouteProp>();
  const {bookId} = route.params;

  const dispatch = useAppDispatch();

  const detailBook = useAppSelector(detailBookSelector);
  const typeBook = useAppSelector(typeBookSelector);

  const [showBook, setShowBook] = useState(false);
  const refReadBook = React.useRef(null);

  const isReview = (data: any): data is Comment => {
    return (
      data &&
      typeof data.bookId === 'string' &&
      typeof data.createdAt === 'string' &&
      typeof data.id === 'string' &&
      typeof data.profilePic === 'string' &&
      typeof data.ulasan === 'string' &&
      typeof data.updatedAt === 'string' &&
      typeof data.userId === 'string' &&
      typeof data.userName === 'string'
    );
  };

  useEffect(() => {
    dispatch(retrieveDetailBook({bookId: bookId}));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ulasan')
      .where('bookId', '==', bookId)
      .onSnapshot(querySnapshot => {
        const comments: Array<Comment> = querySnapshot.docs
          .map(doc => doc.data())
          .filter(isReview);
        dispatch(retrieveCommentBook(comments));
      });

    return () => unsubscribe();
  }, [bookId, dispatch]);

  const isbn = parseInt(
    detailBook.volumeInfo.industryIdentifiers[0].identifier,
  );

  const loading = typeBook === retrieveDetailBook.pending.type;

  if (loading) return <Text>Loading</Text>;

  return (
    <ScrollView backgroundColor="white">
      <View padding={20}>
        <BookContainer refReadBook={refReadBook} setShowBook={setShowBook} />
        <CommentContainer />
      </View>

      {showBook && (
        <ReadBookContainer
          isbn={isbn}
          showBook={showBook}
          setShowBook={setShowBook}
          refReadBook={refReadBook}
        />
      )}
    </ScrollView>
  );
};

export default DetailBook;

import {Button, Card, Image, Box, ButtonText} from '@gluestack-ui/themed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useRedux';
import {loginUser} from '../../redux/user/userSlice';

const GoogleLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '185717950311-jcp6mou78s5vn0g5snvbakpecv0albfu.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {user, idToken} = await GoogleSignin.signIn();

      if (!user) {
        throw new Error('User info is undefined');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      dispatch(loginUser(user));

      const authResult = await auth().signInWithCredential(googleCredential);
      return authResult;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
      <Image
        alt="loginImage"
        mb="$6"
        h={240}
        width={480}
        borderRadius={20}
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />

      <Box
        flexDirection="column"
        sx={{
          '@sm': {
            flexDirection: 'row',
          },
        }}>
        <Button
          px="$4"
          py="$2"
          mr="$0"
          sx={{
            '@sm': {
              mr: '$3',
              mb: '$0',
              flex: 1,
            },
          }}
          onPress={() => signIn()}>
          <ButtonText size="sm">Masuk Dengan Google</ButtonText>
        </Button>
      </Box>
    </Card>
  );
};

export default GoogleLogin;

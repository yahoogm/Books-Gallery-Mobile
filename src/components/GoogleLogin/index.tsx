import {Button, Card, Image, Box, ButtonText} from '@gluestack-ui/themed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const GoogleLogin = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '185717950311-jcp6mou78s5vn0g5snvbakpecv0albfu.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      console.log(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const final = await auth().signInWithCredential(googleCredential);
      console.log(final);
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

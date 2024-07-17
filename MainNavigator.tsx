import {DetailBookScreen, HomeScreen, LoginScreen} from './src/screens';
import {
  Menu,
  Button as ButtonGluestack,
  MenuItem,
  MenuItemLabel,
  Icon,
  ExternalLinkIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import {Button} from 'react-native';
import {useAppDispatch, useAppSelector} from './src/hooks/useRedux';
import {isLoginSelector, userSelector} from './src/redux/user/userSelector';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {logoutUser} from './src/redux/user/userSlice';
import {useToast, Toast, VStack, ToastTitle} from '@gluestack-ui/themed';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const toast = useToast();
  const isLogin = useAppSelector(isLoginSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(logoutUser({}));

      toast.show({
        placement: 'bottom',
        render: ({id}) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack space="xs">
                <ToastTitle>Logout berhasil</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      toast.show({
        placement: 'bottom',
        render: ({id}) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack space="xs">
                <ToastTitle>Logout gagal</ToastTitle>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };
  return (
    <Provider store={Store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Galeri Buku">
            <Stack.Screen
              name="Galeri Buku"
              component={HomeScreen}
              options={({navigation}) => ({
                headerTitle: 'Galeri Buku',
                headerRight: () =>
                  isLogin ? (
                    <Menu
                      placement="bottom right"
                      trigger={({...triggerProps}) => {
                        return (
                          <ButtonGluestack {...triggerProps}>
                            <ButtonText>
                              {user.name !== null || undefined
                                ? user.name
                                : 'no name'}
                            </ButtonText>
                          </ButtonGluestack>
                        );
                      }}>
                      <MenuItem
                        key="Logout"
                        textValue="Logout"
                        onPress={() => signOut()}>
                        <Icon
                          as={ExternalLinkIcon}
                          w="$5"
                          h="$5"
                          color="red"
                          marginRight={6}
                        />
                        <MenuItemLabel size="md" color="red" bold={true}>
                          Logout
                        </MenuItemLabel>
                      </MenuItem>
                    </Menu>
                  ) : (
                    <Button
                      title="Masuk"
                      onPress={() => navigation.navigate('Login')}
                    />
                  ),
              })}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="DetailBook" component={DetailBookScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

export default MainNavigator;

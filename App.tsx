import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen} from './src/screens';
import {Button} from 'react-native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={Store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                headerTitle: 'Galeri Buku',
                headerRight: () => (
                  <Button
                    title="Masuk"
                    onPress={() => navigation.navigate('Login')}
                  />
                ),
              })}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;

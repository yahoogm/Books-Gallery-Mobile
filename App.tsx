import React from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen} from './src/screens';
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
          <Stack.Navigator initialRouteName="Galeri Buku">
            <Stack.Screen name="Galeri Buku" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;

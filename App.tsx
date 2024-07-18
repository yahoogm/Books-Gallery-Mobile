import React from 'react';
import MainNavigator from './MainNavigator';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <Provider store={Store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;

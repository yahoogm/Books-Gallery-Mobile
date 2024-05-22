import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import MainNavigator from './MainNavigator';

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

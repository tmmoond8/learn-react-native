/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {LogContextProvider} from './contexts/LogContext';

const App = () => {
  return (
    <LogContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </LogContextProvider>
  );
};

export default App;

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
import {SearchContextProvider} from './contexts/SearchContext';

const App = () => {
  return (
    <LogContextProvider>
      <SearchContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SearchContextProvider>
    </LogContextProvider>
  );
};

export default App;

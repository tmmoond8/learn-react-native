/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screens/RootStack';
import {UserContextProvider} from './src/contexts/UserContext';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}

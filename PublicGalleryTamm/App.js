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

export default function () {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

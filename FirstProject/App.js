/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Greeting from './components/Greeting';
import Box from './components/Box';

const App = () => {
  return (
    <SafeAreaView>
      <Greeting />
      <Box />
    </SafeAreaView>
  );
};

export default App;

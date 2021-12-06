/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Button} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        intinalRouteName="Home"
        drawerPosition="left"
        backBehavior="history"
        drawerContent={({navigation}) => (
          <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button
              onPress={() => navigation.closeDrawer()}
              title="Drawer 닫기"
            />
          </SafeAreaView>
        )}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: '설정',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

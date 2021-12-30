import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

export default function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      <Text style={styles.text}>Hello, {user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

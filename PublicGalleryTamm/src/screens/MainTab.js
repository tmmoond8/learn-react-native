import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

export default function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      {user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={styles.image}
          resizeMode="cover"
        />
      )}
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
  image: {
    width: 128,
    height: 128,
    marginBottom: 16,
    borderRadius: 64,
  },
  text: {
    fontSize: 24,
  },
});

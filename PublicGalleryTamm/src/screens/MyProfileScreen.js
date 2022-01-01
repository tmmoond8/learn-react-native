import React from 'react';
import {View, StyleSheet} from 'react-native';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      <Profile userId={user.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

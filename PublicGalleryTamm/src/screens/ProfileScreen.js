import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Profile from '../components/Profile';

export default function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  React.useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return (
    <View style={styles.block}>
      <Profile userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

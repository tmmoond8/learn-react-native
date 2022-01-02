import React from 'react';
import {Text, Pressable, Platform, View, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../libs/auth';

export default function SettingScreen() {
  const {setUser} = useUserContext();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };
  return (
    <View style={styles.block}>
      <Pressable
        onPress={handleLogout}
        style={({pressed}) => [
          styles.item,
          pressed && Platform.select({ios: {opacity: 0.5}}),
        ]}
        android_ripple={{
          color: '#eeeeee',
        }}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 32,
  },
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {signOut} from '../libs/auth';
import {createUser} from '../libs/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

export default function SetupProfile() {
  const [displayName, setDisplayName] = React.useState('');
  const navigation = useNavigation();

  const {params} = useRoute();
  const {uid} = params || {};

  const handleSubmit = () => {
    console.log('submit', uid, displayName);
    createUser({
      id: uid,
      displayName,
      photoURL: null,
    });
  };

  const handleCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.circle} />
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={handleSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="다음" onPress={handleSubmit} hasMarginBottom />
          <CustomButton title="취소" onPress={handleCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

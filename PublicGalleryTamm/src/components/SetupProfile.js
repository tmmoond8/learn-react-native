import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, View, StyleSheet, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../libs/auth';
import {createUser} from '../libs/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

export default function SetupProfile() {
  const [displayName, setDisplayName] = React.useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setReponse] = React.useState(null);

  const {params} = useRoute();
  const {uid} = params || {};

  const handleSubmit = () => {
    const user = {
      id: uid,
      displayName,
      photoURL: null,
    };
    createUser(user);
    setUser(user);
  };

  const handleCancel = () => {
    signOut();
    navigation.goBack();
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          // 취소한 경우
          return;
        }
        setReponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={handleSelectImage}>
        <Image
          style={styles.circle}
          source={{
            uri: response
              ? response?.assets[0]?.uri
              : 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735418/noticon/dfzcwdbtls4cs6bpsoqk.png',
          }}
        />
      </Pressable>
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

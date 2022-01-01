import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../libs/auth';
import {getImageUrl} from '../libs/utils';
import {createUser} from '../libs/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import Avatar from './Avatar';

export default function SetupProfile() {
  const [displayName, setDisplayName] = React.useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setReponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {params} = useRoute();
  const {uid} = params || {};

  const handleSubmit = async () => {
    setLoading(true);
    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop();
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }
      photoURL = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
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
        <Avatar
          size={128}
          source={{
            uri: getImageUrl(response?.assets[0]?.uri),
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
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={handleSubmit} hasMarginBottom />
            <CustomButton
              title="취소"
              onPress={handleCancel}
              theme="secondary"
            />
          </View>
        )}
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
  spinner: {
    marginTop: 24,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

import React from 'react';
import {
  ActionSheetIOS,
  View,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModal from './UploadModal';
import {useNavigation} from '@react-navigation/native';

const TABBAR_HEIGHT = 49;

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

export default function CameraButton() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const handlePickImage = res => {
    if (!res || res.didCancel) {
      return;
    }
    navigation.push('Upload', {res});
  };

  const handleLaunchCamera = () => {
    launchCamera(imagePickerOption, handlePickImage);
  };

  const handleLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, handlePickImage);
  };

  const handlePress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          handleLaunchCamera();
        }
        if (buttonIndex === 1) {
          handleLaunchImageLibrary();
        }
      },
    );
  };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{color: '#ffffff'}}
          style={styles.circle}
          onPress={handlePress}>
          <Icon name="camera-alt" color="white" size={24} />
        </Pressable>
      </View>
      <UploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={handleLaunchCamera}
        onLaunchImageLibrary={handleLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -27}],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 27,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {
  TextInput,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../libs/posts';
import events from '../libs/events';

export default function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const {user} = useUserContext();
  const animation = React.useRef(new Animated.Value(width)).current;
  const [description, setDescription] = React.useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  const navigation = useNavigation();
  const handleSubmit = React.useCallback(async () => {
    navigation.pop();
    const asset = res.assets[0];
    const extension = asset.fileName.split('.').pop();

    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }
    const photoURL = await reference.getDownloadURL();
    await createPost({description, photoURL, user});
    events.emit('refresh');
  }, [res, user, description, navigation]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={handleSubmit} name="send" />,
    });
  }, [navigation, handleSubmit]);

  React.useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 0,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      keyboardVerticalOffset={Platform.select({
        ios: 180,
      })}
      style={styles.block}>
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline
        placeholder="이 사진에 대한 설명을 입력하세요...."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

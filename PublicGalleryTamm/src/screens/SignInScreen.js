import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignForm from '../components/SignForm';
import SignButtons from '../components/SignButtons';
import {signIn, signUp} from '../libs/auth';

export default function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = React.useState(false);

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      return Alert.alert('비밀번호가 일치하지 않습니다.');
    }

    const info = {email, password};
    setLoading(true);

    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      console.log(user);
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일 입니다',
        'uath/wrong-password': '잘못 된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };

      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            form={form}
            isSignUp={isSignUp}
            onSubmit={handleSubmit}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            loading={loading}
            isSignUp={isSignUp}
            onSubmit={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

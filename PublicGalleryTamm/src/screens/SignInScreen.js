import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';

export default function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <BorderedInput
            hasMarginBottom
            placeholder="이메일"
            value={form.email}
            onChangeText={createChangeTextHandler('email')}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <BorderedInput
            placeholder="비밀번호"
            hasMarginBottom={isSignUp}
            value={form.password}
            onChangeText={createChangeTextHandler('password')}
            secureTextEntry
            ref={passwordRef}
            returnKeyType={isSignUp ? 'next' : 'done'}
            onSubmitEditing={() => {
              if (isSignUp) {
                confirmPasswordRef.current.focus();
              } else {
                handleSubmit();
              }
            }}
          />
          {isSignUp && (
            <BorderedInput
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChangeText={createChangeTextHandler('confirmPassword')}
              secureTextEntry
              ref={confirmPasswordRef}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          )}
          {isSignUp ? (
            <View style={styles.buttons}>
              <CustomButton
                title="회원가입"
                hasMarginBottom
                onPress={handleSubmit}
              />
              <CustomButton
                title="로그인"
                theme="secondary"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          ) : (
            <View style={styles.buttons}>
              <CustomButton
                title="로그인"
                hasMarginBottom
                onPress={handleSubmit}
              />
              <CustomButton
                title="회원가입"
                theme="secondary"
                onPress={() => {
                  navigation.push('SignIn', {isSignUp: true});
                }}
              />
            </View>
          )}
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
  buttons: {
    marginTop: 64,
  },
});

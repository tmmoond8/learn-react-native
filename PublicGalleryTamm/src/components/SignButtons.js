import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function SignButtons({isSignUp, onSubmit}) {
  const navigation = useNavigation();

  return (
    <>
      {isSignUp ? (
        <View style={styles.buttons}>
          <CustomButton title="회원가입" hasMarginBottom onPress={onSubmit} />
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
          <CustomButton title="로그인" hasMarginBottom onPress={onSubmit} />
          <CustomButton
            title="회원가입"
            theme="secondary"
            onPress={() => {
              navigation.push('SignIn', {isSignUp: true});
            }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
});

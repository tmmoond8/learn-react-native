import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

function AddTodo({onInsert}) {
  const [text, setText] = React.useState('');
  const handlePress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss();
  };

  const Button = () => (
    <View style={styles.buttonStyle}>
      <Image source={require('../assets/icons/add_white/add_white.png')} />
    </View>
  );

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handlePress}
        returnKeyType="done"
      />
      {Platform.select({
        ios: (
          <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
            <Button />
          </TouchableOpacity>
        ),
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={handlePress}>
              <Button />
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingHorizontal: 16,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#26a69a',
    borderRadius: 24,
    marginTop: 7,
  },
  circleWrapper: {
    overflow: 'hidden',
    borderRadius: 24,
  },
});

export default AddTodo;

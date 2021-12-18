import React from 'react';
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSearchContext} from '../contexts/SearchContext';

export default function SearchHeader() {
  const {width} = useWindowDimensions();
  const {keyword, setKeyword} = useSearchContext();
  return (
    <View
      style={[
        styles.block,
        {
          width: width - 32,
        },
      ]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        placeholderTextColor="#aaa"
        value={keyword}
        onChangeText={setKeyword}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

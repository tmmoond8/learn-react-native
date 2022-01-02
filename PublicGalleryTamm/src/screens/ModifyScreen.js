import React from 'react';
import {
  TextInput,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import {updatePost} from '../libs/posts';

export default function ModifyScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();

  const [description, setDescription] = React.useState(params.description);

  const handleSubmit = React.useCallback(async () => {
    await updatePost({
      id: params.id,
      description,
    });
    // TODO: 포스트 및 포스트 목록 업데이트
    navigation.pop();
  }, [navigation, description, params.id]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconRightButton name="check" onPress={handleSubmit} />
      ),
    });
  }, [navigation, handleSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 88})}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="이 사진에 대한 설명을 입력하세요..."
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
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

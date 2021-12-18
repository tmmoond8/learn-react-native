import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useLogContext} from '../contexts/LogContext';

export default function WriteScreen({route}) {
  const log = route.params?.log;
  const [title, setTitle] = React.useState(log?.title ?? '');
  const [body, setBody] = React.useState(log?.body ?? '');
  const navigation = useNavigation();
  const {onCreate, onModify, onRemove} = useLogContext();

  const handleSave = () => {
    if (log) {
      onModify({
        ...log,
        title,
        body,
      });
    } else {
      onCreate({
        title,
        body,
        date: new Date().toISOString(),
      });
    }
    navigation.pop();
  };

  const handleAskRemove = () => {
    Alert.alert('삭제', '정말로 삭제하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          onRemove(log?.id);
          navigation.pop();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={handleSave}
          onAskRemove={handleAskRemove}
          isEditing={!!log}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

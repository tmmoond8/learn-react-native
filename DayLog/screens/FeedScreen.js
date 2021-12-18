import React from 'react';
import {View, StyleSheet} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import {useLogContext} from '../contexts/LogContext';
import FeedList from '../components/FeedList';

export default function FeedScreen() {
  const {logs} = useLogContext();
  const [hidden, setHidden] = React.useState(false);
  const onScrollToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };
  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrollToBottom={onScrollToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

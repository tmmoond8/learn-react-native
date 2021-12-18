import React from 'react';
import {View, StyleSheet} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';

export default function FeedScreen() {
  return (
    <View style={styles.block}>
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

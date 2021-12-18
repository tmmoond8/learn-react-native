import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from './TransparentCircleButton';

export default function WriteHeader({onSave, onAskRemove, isEditing}) {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={handleGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <View style={[styles.iconButtonWrapper, styles.marginRight]}>
            <Pressable
              style={[styles.iconButton]}
              android_ripple={{color: '#ededed'}}
              onPress={onAskRemove}>
              <Icon name="delete-forever" size={24} color="#ef5350" />
            </Pressable>
          </View>
        )}
        <View style={[styles.iconButtonWrapper]}>
          <Pressable
            style={[styles.iconButton]}
            android_ripple={{color: '#ededed'}}
            onPress={onSave}>
            <Icon name="check" size={24} color="#009688" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
});

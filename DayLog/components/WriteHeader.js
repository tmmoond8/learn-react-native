import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TransparentCircleButton from './TransparentCircleButton';

const initialState = {mode: 'date', visible: false};

export default function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}) {
  const navigation = useNavigation();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const open = mode => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});
  const handleGoBack = () => {
    navigation.pop();
  };

  const handleConfirm = selectedDate => {
    close();
    onChangeDate(selectedDate);
  };

  const handleCancel = () => {
    close();
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
      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        date={date}
      />
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
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    botom: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
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

function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

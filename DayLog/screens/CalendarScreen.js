import React from 'react';
import {Animated, Button, View, StyleSheet} from 'react-native';

export default function CalendarScreen() {
  return (
    <View style={styles.block}>
      {/* <FadeInAndOut /> */}
      {/* <SlideLeftAndRight /> */}
      <SlideLeftAndRightWithFade />
    </View>
  );
}

function SlideLeftAndRightWithFade() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          setEnabled(!enabled);
        }}
      />
    </View>
  );
}

function SlideLeftAndRight() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 150 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[styles.rectangle, {transform: [{translateX: animation}]}]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          setEnabled(!enabled);
        }}
      />
    </View>
  );
}

function FadeInAndOut() {
  const animation = React.useRef(new Animated.Value(1)).current;

  return (
    <View>
      <Animated.View style={[styles.rectangle, {opacity: animation}]} />
      <Button
        title="FadeIn"
        onPress={() => {
          Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
      />
      <Button
        title="FadeOut"
        onPress={() => {
          Animated.timing(animation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
});

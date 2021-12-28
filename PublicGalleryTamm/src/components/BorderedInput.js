import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default React.forwardRef(function BorderedInput(
  {hasMarginBottom, ...rest},
  ref,
) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      placeholderTextColor="#bdbdbd"
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

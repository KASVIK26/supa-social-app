import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { hp, wp } from '../app/helpers/common';
import { theme } from '../constants/theme';

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.multiline && { height: hp(15), textAlignVertical: 'top' }]} // Adjust height for multiline
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputref && props.inputref}
        multiline={props.multiline}  // Ensure multiline is passed here
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.0,
    borderColor: theme.colors.text,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xxl,
    justifyContent: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: hp(7.2),  // Default height for single line input
  },
});

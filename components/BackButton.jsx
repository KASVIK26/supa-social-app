import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '../assets/icons';  // Ensure the import path is correct and the icon library supports the props.
import { theme } from '../constants/theme';

const BackButton = ({ size = 26, router }) => {
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      {/* Ensure Icon component can handle size, strokeWidth, and color */}
      <Icon name="arrowLeft" strokeWidth={2.5} width={size} height={size} color={theme.colors.text} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
    padding: 5,  // Add some padding for touchable area
  },
});

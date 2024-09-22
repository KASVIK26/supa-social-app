import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { hp } from '../app/helpers/common';
import { theme } from '../constants/theme';
import { Image } from 'expo-image';
import { getUserImageSrc } from '../services/imageService';

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {}
}) => {
  return (
    <View style={[styles.avatarContainer, { height: size, width: size, borderRadius: rounded }, style]}>
      <Image
        source={getUserImageSrc(uri)}
        transition={100}
        style={{ height: size, width: size, borderRadius: rounded }}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: theme.colors.darkLight, 
    borderWidth: 1, 
    borderCurve:'continuous',
    },
});

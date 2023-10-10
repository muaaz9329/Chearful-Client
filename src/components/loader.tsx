import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '@app/constants';

type Props = {
  size?: 'small' | 'large';
  style?: ViewStyle;
};

const Loader = ({ size = 'small', style }: Props) => {
  return (
    <ActivityIndicator
      color={Colors.primary}
      size={size}
      style={[styles.loader, style]}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

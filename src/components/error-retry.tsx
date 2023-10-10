import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from './my-button';
import globalStyles from '@app/assets/global-styles';
import { isTablet } from 'react-native-device-info';

export default function ErrorRetry({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={[styles.container, globalStyles.my_10]}>
      <Text
        style={[
          globalStyles.mb_10,
          globalStyles.textBlack,
          globalStyles.fs_20,
          isTablet() ? globalStyles.fs_16 : {},
        ]}
      >
        Something went wrong.
      </Text>
      <MyButton title="Retry" onPress={() => onRetry()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

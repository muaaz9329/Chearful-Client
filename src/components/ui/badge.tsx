import React from 'react';
import { Colors } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import {
  Pressable,
  ViewStyle,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';

export default function Badge({
  onPress,
  style,
  text,
  textStyle,
}: {
  onPress?: () => void;
  style?: ViewStyle | any;
  text?: string;
  textStyle?: TextStyle;
}) {
  return (
    <Pressable
      onPress={() => onPress?.()}
      style={[
        styles.container,
        IsTablet ? styles.container__tablet : {},
        style,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          IsTablet ? styles.badgeText__tablet : {},
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: Wp(10),
    paddingHorizontal: Wp(10),
    paddingVertical: Wp(5),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.primary,
    fontSize: Wp(11),
  },

  container__tablet: {
    paddingVertical: Wp(4),
    paddingHorizontal: Wp(8),
  },
  badgeText__tablet: {
    fontSize: Wp(8),
  },
});

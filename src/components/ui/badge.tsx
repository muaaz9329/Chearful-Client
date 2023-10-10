import React from 'react';
import { Colors } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function Badge({
  onPress,
  //   style,
  text,
}: {
  onPress?: () => void;
  style?: any;
  text?: string;
}) {
  return (
    <Pressable
      onPress={() => onPress?.()}
      style={[styles.container, IsTablet ? styles.container__tablet : {}]}
    >
      <Text
        style={[styles.badgeText, IsTablet ? styles.badgeText__tablet : {}]}
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

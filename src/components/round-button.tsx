import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Wp } from '@app/utils';

type Props = {};

const RoundButton = ({
  bgColor,
  children,
  ...props
}: TouchableOpacityProps & {
  bgColor: string;
  children?: React.ReactNode;
}) => {
  const styles: TouchableOpacityProps['style'] = {
    padding: Wp(20),
    alignSelf: 'flex-start',
    borderRadius: Wp(50),

    backgroundColor: bgColor,
  };
  //@ts-ignore
  return <TouchableOpacity {...props} style={[styles]}>{children}</TouchableOpacity>;
};

export default RoundButton;

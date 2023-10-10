import React from 'react';
import { IsTablet, Nunito, Wp } from '@app/utils';
import { Text, TextProps } from 'react-native';
import { Colors } from '@app/constants';

const fontSizes = {
  sm: IsTablet ? Wp(1) : Wp(10),
  md: IsTablet ? Wp(10) : Wp(16),
  lg: IsTablet ? Wp(12) : Wp(10),
  xl: IsTablet ? Wp(12) : Wp(10),
  '2xl': IsTablet ? Wp(12) : Wp(10),
};

export default function Heading({
  children,
  style,
  size,
  ...props
}: TextProps & {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
  const styles = {
    // Default
    fontFamily: Nunito(700),
    color: Colors.primary,
    fontSize: fontSizes[size || 'lg'],
  };

  return (
    <Text style={[styles, style]} {...props}>
      {children}
    </Text>
  );
}

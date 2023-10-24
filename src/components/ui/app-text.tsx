import React from 'react';
import { Text, TextProps } from 'react-native';
import { Colors } from '@app/constants';
import { IsTablet, Mulish, Wp } from '@app/utils';

export type AppTextProps = TextProps & {
  children: React.ReactNode;
  size?: 'base' | 'sm' | 'md' | 'lg';
};

const fontSizes = {
  sm: IsTablet ? Wp(7) : Wp(12),
  base: IsTablet ? Wp(9) : Wp(14),
  md: IsTablet ? Wp(11) : Wp(16),
  lg: IsTablet ? Wp(12) : Wp(18),
};

export default function AppText({ style, size, ...props }: AppTextProps) {
  const styles = {
    // Default
    fontFamily: Mulish(400),
    color: Colors.black,
    lineHeight: IsTablet ? Wp(12) : Wp(20),

    // Size
    fontSize: fontSizes[size || 'base'],
  };

  return <Text style={[styles, style]} {...props} />;
}

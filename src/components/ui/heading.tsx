import { Colors, Fonts } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import { Text, TextProps } from 'react-native';

export type HeadingProps = TextProps & {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
};

const fontSizes = {
  sm: IsTablet ? Wp(10) : Wp(16),
  md: IsTablet ? Wp(13) : Wp(20),
  lg: IsTablet ? Wp(14) : Wp(21),
  xl: IsTablet ? Wp(17) : Wp(26),
  xxl: IsTablet ? Wp(20) : Wp(30),
  xxxl: IsTablet ? Wp(24) : Wp(36),
};

export default function Heading({
  children,
  style,
  size,
  ...props
}: HeadingProps) {
  const styles = {
    // Default
    fontFamily: Fonts.Nunito['700'],
    color: Colors.primary,
    fontSize: fontSizes[size || 'lg'],
  };

  return (
    <Text style={[styles, style]} {...props}>
      {children}
    </Text>
  );
}

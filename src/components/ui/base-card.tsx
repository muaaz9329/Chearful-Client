import { Colors } from '@app/constants';
import { IsTablet, Wp, hp } from '@app/utils';
import { View, ViewProps } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

export default function BaseCard({ children, style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          minHeight: hp(20),
          maxWidth: IsTablet ? Wp(240) : Wp(345),
          backgroundColor: Colors.greenDim,
          borderRadius: 20,
          padding: moderateVerticalScale(20),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

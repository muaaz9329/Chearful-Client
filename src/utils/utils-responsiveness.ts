import { Fonts } from '@src/constants/app-theme';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const Wp = (size: number) => {
  return wp(2.5 * (size / 10));
};

export const Hp = (size: number) => {
  return hp(1.5 * (size / 10));
};

export const Mulish = (weight: number, italic?: boolean) => {
  const font = Fonts.Mulish[weight as keyof typeof Fonts.Mulish] as string;
  if (italic) {
    return (
      Fonts.Mulish.Italic[weight as keyof typeof Fonts.Mulish.Italic] || font
    );
  }
  return font;
};

export const Nunito = (weight: number, italic?: boolean) => {
  const font = Fonts.Nunito[weight as keyof typeof Fonts.Nunito] as string;
  if (italic) {
    return (
      Fonts.Nunito.Italic[weight as keyof typeof Fonts.Nunito.Italic] || font
    );
  }
  return font;
};

export const Roboto = (weight: number, italic?: boolean) => {
  const font = Fonts.Roboto[weight as keyof typeof Fonts.Roboto] as string;
  if (italic) {
    return (
      Fonts.Roboto.Italic[weight as keyof typeof Fonts.Roboto.Italic] || font
    );
  }
  return font;
};

export const IsTablet = DeviceInfo.isTablet();
export const IsPhone = DeviceInfo.getDeviceType() === 'Handset';

export { wp, hp };

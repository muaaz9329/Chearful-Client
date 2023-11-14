import { Colors } from '@app/constants';
import { Mulish, Nunito, Wp, wp, hp } from '@app/utils';
import { Platform, StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },

  //* Text Sizes

  fs_6: {
    fontSize: Wp(6),
  },
  fs_7: {
    fontSize: Wp(7),
  },
  fs_8: {
    fontSize: Wp(8),
  },
  fs_10: {
    fontSize: Wp(10),
  },
  fs_11: {
    fontSize: Wp(11),
  },
  fs_12: {
    fontSize: Wp(12),
  },
  fs_13: {
    fontSize: Wp(13),
  },
  fs_14: {
    fontSize: Wp(14),
  },
  fs_15: {
    fontSize: Wp(15),
  },
  fs_16: {
    fontSize: Wp(16),
  },
  fs_18: {
    fontSize: Wp(18),
  },
  fs_20: {
    fontSize: Wp(20),
  },

  //* Font Family
  mulish_100: {
    fontFamily: Mulish(100),
  },
  mulish_200: {
    fontFamily: Mulish(200),
  },
  mulish_300: {
    fontFamily: Mulish(300),
  },
  mulish_400: {
    fontFamily: Mulish(400),
  },
  mulish_500: {
    fontFamily: Mulish(500),
  },
  mulish_600: {
    fontFamily: Mulish(600),
  },
  mulish_700: {
    fontFamily: Mulish(700),
  },
  mulish_800: {
    fontFamily: Mulish(800),
  },
  nunito_100: {
    fontFamily: Nunito(100),
  },
  nunito_200: {
    fontFamily: Nunito(200),
  },
  nunito_300: {
    fontFamily: Nunito(300),
  },
  nunito_400: {
    fontFamily: Nunito(400),
  },
  nunito_500: {
    fontFamily: Nunito(500),
  },
  nunito_600: {
    fontFamily: Nunito(600),
  },
  nunito_700: {
    fontFamily: Nunito(700),
  },
  nunito_800: {
    fontFamily: Nunito(800),
  },

  //* Text Color
  textWhite: {
    color: Colors.white,
  },
  textBlack: {
    color: Colors.black,
  },
  textPrimary: {
    color: Colors.primary,
  },
  textSecondary: {
    color: Colors.secondary,
  },
  textTertiary: {
    color: Colors.contrast,
  },
  textContrast: {
    color: Colors.contrast,
  },
  textMuted: {
    color: Colors.muted,
  },

  bodyWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Wp(16),
    paddingHorizontal: Wp(20),
  },

  //* Background Color

  bg_white: {
    backgroundColor: Colors.white,
  },
  bg_primary: {
    backgroundColor: Colors.primary,
  },
  bg_secondary: {
    backgroundColor: Colors.secondary,
  },
  bg_Tertiary: {
    backgroundColor: Colors.contrast,
  },

  bg_cont: {
    backgroundColor: Colors.light,
  },

  // Margins
  topMargin: {
    marginTop: Wp(15),
  },
  mt_8: {
    marginTop: Wp(8),
  },
  mt_9: {
    marginTop: Wp(9),
  },
  mt_10: {
    marginTop: Wp(10),
  },
  mt_11: {
    marginTop: Wp(11),
  },
  mt_12: {
    marginTop: Wp(12),
  },
  mt_13: {
    marginTop: Wp(13),
  },
  mt_14: {
    marginTop: Wp(14),
  },
  mt_15: {
    marginTop: Wp(15),
  },
  mt_16: {
    marginTop: Wp(16),
  },
  mt_17: {
    marginTop: Wp(17),
  },
  mt_18: {
    marginTop: Wp(18),
  },
  mt_19: {
    marginTop: Wp(19),
  },
  mt_20: {
    marginTop: Wp(20),
  },

  mb_8: {
    marginBottom: Wp(8),
  },
  mb_9: {
    marginBottom: Wp(9),
  },

  mb_10: {
    marginBottom: Wp(10),
  },
  mb_11: {
    marginBottom: Wp(11),
  },
  mb_12: {
    marginBottom: Wp(12),
  },
  mb_13: {
    marginBottom: Wp(13),
  },
  mb_14: {
    marginBottom: Wp(14),
  },
  mb_15: {
    marginBottom: Wp(15),
  },
  mb_16: {
    marginBottom: Wp(16),
  },
  mb_17: {
    marginBottom: Wp(17),
  },
  mb_18: {
    marginBottom: Wp(18),
  },
  mb_19: {
    marginBottom: Wp(19),
  },
  mb_20: {
    marginBottom: Wp(20),
  },

  my_8: {
    marginVertical: Wp(8),
  },
  my_9: {
    marginVertical: Wp(9),
  },
  my_10: {
    marginVertical: Wp(10),
  },
  my_11: {
    marginVertical: Wp(11),
  },
  my_12: {
    marginVertical: Wp(12),
  },
  my_13: {
    marginVertical: Wp(13),
  },
  my_14: {
    marginVertical: Wp(14),
  },
  my_15: {
    marginVertical: Wp(15),
  },
  my_16: {
    marginVertical: Wp(16),
  },
  my_17: {
    marginVertical: Wp(17),
  },
  my_18: {
    marginVertical: Wp(18),
  },
  my_19: {
    marginVertical: Wp(19),
  },
  my_20: {
    marginVertical: Wp(20),
  },



  // Paddings
  pt_10: {
    paddingTop: Wp(10),
  },
  pt_11: {
    paddingTop: Wp(11),
  },
  pt_12: {
    paddingTop: Wp(12),
  },
  pt_13: {
    paddingTop: Wp(13),
  },
  pt_14: {
    paddingTop: Wp(14),
  },
  pt_15: {
    paddingTop: Wp(15),
  },
  pt_16: {
    paddingTop: Wp(16),
  },
  pt_17: {
    paddingTop: Wp(17),
  },
  pt_18: {
    paddingTop: Wp(18),
  },
  pt_19: {
    paddingTop: Wp(19),
  },
  pt_20: {
    paddingTop: Wp(20),
  },
  pb_10: {
    paddingBottom: Wp(10),
  },
  pb_11: {
    paddingBottom: Wp(11),
  },
  pb_12: {
    paddingBottom: Wp(12),
  },
  pb_13: {
    paddingBottom: Wp(13),
  },
  pb_14: {
    paddingBottom: Wp(14),
  },
  pb_15: {
    paddingBottom: Wp(15),
  },
  pb_16: {
    paddingBottom: Wp(16),
  },
  pb_17: {
    paddingBottom: Wp(17),
  },

  pb_18: {
    paddingBottom: Wp(18),
  },
  pb_19: {
    paddingBottom: Wp(19),
  },
  pb_20: {
    paddingBottom: Wp(20),
  },
  py_2:{
    paddingVertical: Wp(2),
  },

  py_4:{
    paddingVertical: Wp(4),
  },

  py_6:{
    paddingVertical: Wp(6),
  },

  py_8:{
    paddingVertical: Wp(8),
  },
  py_9:{
    paddingVertical: Wp(9),
  },
  py_10: {
    paddingVertical: Wp(10),
  },
  py_11: {
    paddingVertical: Wp(11),
  },
  py_12: {
    paddingVertical: Wp(12),
  },
  py_13: {
    paddingVertical: Wp(13),
  },
  py_14: {
    paddingVertical: Wp(14),
  },
  py_15: {
    paddingVertical: Wp(15),
  },
  py_16: {
    paddingVertical: Wp(16),
  },
  py_17: {
    paddingVertical: Wp(17),
  },
  py_18: {
    paddingVertical: Wp(18),
  },
  py_19: {
    paddingVertical: Wp(19),
  },
  py_20: {
    paddingVertical: Wp(20),
  },
  px_2:{
    paddingHorizontal: Wp(2),
  },
  px_4:{
    paddingHorizontal: Wp(4),
  },
  px_6:{
    paddingHorizontal: Wp(6),
  },
  px_8:{
    paddingHorizontal: Wp(8),
  },
  px_9:{
    paddingHorizontal: Wp(9),
  },
  
  px_10: {
    paddingHorizontal: Wp(10),
  },
  px_11: {
    paddingHorizontal: Wp(11),
  },
  px_12: {
    paddingHorizontal: Wp(12),
  },
  px_13: {
    paddingHorizontal: Wp(13),
  },
  px_14: {
    paddingHorizontal: Wp(14),
  },
  px_15: {
    paddingHorizontal: Wp(15),
  },
  px_16: {
    paddingHorizontal: Wp(16),
  },
  px_17: {
    paddingHorizontal: Wp(17),
  },
  px_18: {
    paddingHorizontal: Wp(18),
  },
  px_19: {
    paddingHorizontal: Wp(19),
  },
  px_20: {
    paddingHorizontal: Wp(20),
  },

  // Flex Utilities
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },

  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexColumnReverse: {
    flexDirection: 'column-reverse',
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
  },
  flex1: {
    flex: 1,
  },
  flexWrap:{
    flexWrap:'wrap'
  },

  // App Styles
  stone: {
    width: Wp(5),
    height: Wp(5),
    borderRadius: Wp(5),
    marginHorizontal: Wp(5),
    backgroundColor: Colors.primary,
  },
  stone__tablet: {
    width: Wp(3),
    height: Wp(3),
  },
  avatar: {
    width: Wp(15),
    height: Wp(15),
    resizeMode: Platform.OS == 'ios' ? 'center' : 'contain',
  },
  avatar__tablet: {
    width: Wp(35),
    height: Wp(35),
  },
  Wrapper:{
    flex:1,
    backgroundColor:Colors.white,
    paddingHorizontal:Wp(20),
    paddingTop:Wp(10)
  },
  'w-full':{
    width:'100%'
  },
  'h-full':{
    height:'100%'
  },
  'round':{
    borderRadius:Wp(100)
  },
  'rounded-full':{
    borderRadius:Wp(8)
  },
  'rounded-2':{
    borderRadius:Wp(12)
  },
  'rounded-3':{
    borderRadius:Wp(16)
  },
  'rounded-4':{
    borderRadius:Wp(24)
  },
  'rounded-5':{
    borderRadius:Wp(38)
  },
  'rounded-1':{
    borderRadius:Wp(8)
  }
});

//* Custom Functions for Global Styles
const globalStylesFunc = {
  fs: (size: number) => {
    return {
      fontSize: Wp(size),
    };
  },
  mt: (size: number) => {
    return {
      marginTop: Wp(size),
    };
  },
  mb: (size: number) => {
    return {
      marginBottom: Wp(size),
    };
  },
  ml: (size: number) => {
    return {
      marginLeft: Wp(size),
    };
  },
  mr:(size: number) => {
    return {
      marginRight: Wp(size),
    };
  },
  my: (size: number) => {
    return {
      marginVertical: Wp(size),
    };
  },
  mx: (size: number) => {
    return {
      marginHorizontal: Wp(size),
    };
  },
  pt: (size: number) => {
    return {
      paddingTop: Wp(size),
    };
  },
  pb: (size: number) => {
    return {
      paddingBottom: Wp(size),
    };
  },
  py: (size: number) => {
    return {
      paddingVertical: Wp(size),
    };
  },
  px: (size: number) => {
    return {
      paddingHorizontal: Wp(size),
    };
  },
  W: (size: number) => {
    return {
      width: Wp(size),
    };
  },
  H: (size: number) => {
    return {
      height: Wp(size),
    };
  },
  m: (size: number) => {
    return {
      margin: Wp(size),
    };
  },
  p: (size: number) => {
    return {
      padding: Wp(size),
    };
  },
  radius: (size: number) => {
    return {
      borderRadius: Wp(size),
    };
  },
  bg: (color: string) => {
    return {
      backgroundColor: color,
    };
  },
  text: (color: string) => {
    return {
      color: color,
    };
  },
  w: (size: number) => {
    return {
      width: wp(size),
    };
  },
  h: (size: number) => {
    return {
      height: hp(size),
    };
  },
  br: (size: number) => {
    return {
      borderRadius: Wp(size),
    };
  },
  bw: (size: number) => {
    return {
      borderWidth: size,
    };
  },
  flex: (size: number) => {
    return {
      flex: size,
    };
  }
};

export default globalStyles;

export { globalStylesFunc };

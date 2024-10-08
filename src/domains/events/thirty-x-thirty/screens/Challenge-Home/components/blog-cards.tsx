import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ModuleImg } from '../../../assets';
import { IconEye, IconStar } from 'tabler-icons-react-native';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { IsTablet, Wp, colorWithOpacity, mergeStyles } from '@app/utils';
import { Heading } from '@app/components';

const BlogCards = () => {
  return (
    <ImageBackground
      style={[
        globalStyles.px_10,
        globalStyles.py_10,
        globalStylesFunc.br(24),
        styles.imgCont,
        IsTablet &&
          mergeStyles(
            globalStylesFunc.w(40),
            globalStylesFunc.H(100),
            globalStylesFunc.br(10),
          ),
      ]}
      source={ModuleImg.blogImg}
      resizeMode="stretch"
    >
      <View
        style={[
          globalStyles.px_10,
          globalStylesFunc.py(8),
          globalStylesFunc.bg(colorWithOpacity('#F5F5F5', 0.3)),
          globalStylesFunc.br(40),
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.justifyStart,
          {
            alignSelf: 'flex-start',
          },
          IsTablet &&
            mergeStyles(
              globalStylesFunc.py(5),
              globalStylesFunc.br(30),
              globalStylesFunc.px(8),
            ),
        ]}
      >
        <IconStar
          size={IsTablet ? Wp(12) : Wp(20)}
          color="#ffffff"
          fill="#ffffff"
        />
        <Heading size="sm" style={[styles.LeftMargin, globalStyles.textWhite]}>
          Recommended
        </Heading>
      </View>

      <View style={[globalStyles.my_15, IsTablet && globalStylesFunc.my(7)]}>
        <Heading size="sm" style={[globalStyles.textWhite]}>
          Take a look at the upcoming schedule.
        </Heading>
      </View>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.justifyStart,
        ]}
      >
        <IconEye size={IsTablet ? Wp(12) : Wp(20)} color="#ffffff" />
        <Heading size="sm" style={[styles.LeftMargin, globalStyles.textWhite]}>
          12k Read
        </Heading>
      </View>
    </ImageBackground>
  );
};

export default BlogCards;

const styles = StyleSheet.create({
  LeftMargin: {
    marginLeft: Wp(6),
  },
  imgCont: {
    overflow: 'hidden',
    height: Wp(170),
  },
});

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G , Path , Defs , ClipPath , Rect,Circle} from 'react-native-svg'

const SuccessIcon = ({width,height,bgColor,tickColor}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="48" cy="48" r="48" fill={bgColor} />
      <Path
        d="M39.1711 54.1727C40.7332 55.7349 43.266 55.7348 44.8281 54.1726L65.9983 32.9998C67.1027 31.8953 68.8934 31.8949 69.9983 32.999C71.1037 34.1037 71.104 35.8953 69.999 37.0003L44.8281 62.1715C43.266 63.7336 40.7333 63.7336 39.1712 62.1715L25.9996 48.9998C24.8953 47.8954 24.8953 46.1049 25.9996 45.0005C27.104 43.8961 28.8946 43.8961 29.999 45.0005L39.1711 54.1727Z"
        fill={tickColor}
      />
    </Svg>
  );
};

export default SuccessIcon;

const styles = StyleSheet.create({});

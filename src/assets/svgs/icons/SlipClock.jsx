import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Circle, Path, G, Rect, ClipPath, Defs,Mask } from "react-native-svg";

const SlipClock = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<G opacity="0.7" clip-path="url(#clip0_8606_164320)">
<Path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M8 4.6665V7.99984L10 9.99984" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_8606_164320">
<Rect width="16" height="16" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default SlipClock

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Path,G,Defs,ClipPath, Rect} from 'react-native-svg'

const Plus = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_30_1666)">
    <Path d="M12 5V19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M5 12H19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    <Defs>
    <ClipPath id="clip0_30_1666">
    <Rect width="24" height="24" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default Plus

const styles = StyleSheet.create({})
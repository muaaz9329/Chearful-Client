import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,G,Path,Defs,ClipPath,Rect} from 'react-native-svg'
const EmailIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G opacity="0.7" clip-path="url(#clip0_7922_118622)">
    <Path d="M12.6667 3.3335H3.33333C2.59695 3.3335 2 3.93045 2 4.66683V11.3335C2 12.0699 2.59695 12.6668 3.33333 12.6668H12.6667C13.403 12.6668 14 12.0699 14 11.3335V4.66683C14 3.93045 13.403 3.3335 12.6667 3.3335Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M2 4.6665L8 8.6665L14 4.6665" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    <Defs>
    <ClipPath id="clip0_7922_118622">
    <Rect width="16" height="16" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default EmailIcon

const styles = StyleSheet.create({})
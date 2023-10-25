import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,G,Path,Defs,Rect,ClipPath} from 'react-native-svg'
const ClockIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G opacity="0.7" clip-path="url(#clip0_7247_112876)">
    <Path d="M7.99967 14.6668C4.31767 14.6668 1.33301 11.6822 1.33301 8.00016C1.33301 4.31816 4.31767 1.3335 7.99967 1.3335C11.6817 1.3335 14.6663 4.31816 14.6663 8.00016C14.6663 11.6822 11.6817 14.6668 7.99967 14.6668ZM8.66634 8.00016V4.66683H7.33301V9.3335H11.333V8.00016H8.66634Z" fill={color}/>
    </G>
    <Defs>
    <ClipPath id="clip0_7247_112876">
    <Rect width="16" height="16" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default ClockIcon

const styles = StyleSheet.create({})
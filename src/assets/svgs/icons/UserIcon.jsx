import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G, Path,Defs,ClipPath,Rect} from 'react-native-svg'
const UserIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<G opacity="0.7" clip-path="url(#clip0_7922_118613)">
<Path d="M7.99967 7.33333C9.47243 7.33333 10.6663 6.13943 10.6663 4.66667C10.6663 3.19391 9.47243 2 7.99967 2C6.52691 2 5.33301 3.19391 5.33301 4.66667C5.33301 6.13943 6.52691 7.33333 7.99967 7.33333Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_7922_118613">
<Rect width="16" height="16" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default UserIcon

const styles = StyleSheet.create({})
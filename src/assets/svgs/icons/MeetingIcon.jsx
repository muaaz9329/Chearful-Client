import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Circle, Path, G, Rect, ClipPath, Defs,Mask } from "react-native-svg";

const MeetingIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<G opacity="0.7" clip-path="url(#clip0_9650_256323)">
<Path d="M5.99967 7.33333C7.47243 7.33333 8.66634 6.13943 8.66634 4.66667C8.66634 3.19391 7.47243 2 5.99967 2C4.52691 2 3.33301 3.19391 3.33301 4.66667C3.33301 6.13943 4.52691 7.33333 5.99967 7.33333Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M2 14V12.6667C2 11.9594 2.28095 11.2811 2.78105 10.781C3.28115 10.281 3.95942 10 4.66667 10H7.33333C8.04058 10 8.71885 10.281 9.21895 10.781C9.71905 11.2811 10 11.9594 10 12.6667V14" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10.667 2.08691C11.2406 2.23378 11.749 2.56738 12.1121 3.03512C12.4752 3.50286 12.6722 4.07813 12.6722 4.67025C12.6722 5.26236 12.4752 5.83763 12.1121 6.30537C11.749 6.77311 11.2406 7.10671 10.667 7.25358" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M14 14.0001V12.6668C13.9966 12.0782 13.7986 11.5073 13.4368 11.043C13.0751 10.5788 12.5699 10.2472 12 10.1001" stroke={color}stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_9650_256323">
<Rect width="16" height="16" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default MeetingIcon

const styles = StyleSheet.create({})
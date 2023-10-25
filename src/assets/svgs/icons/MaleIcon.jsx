
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const MaleIcon = ({height,width,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_6098_108875)">
    <Path d="M13.3337 25.6667C17.0156 25.6667 20.0003 22.6819 20.0003 19C20.0003 15.3181 17.0156 12.3333 13.3337 12.3333C9.65176 12.3333 6.66699 15.3181 6.66699 19C6.66699 22.6819 9.65176 25.6667 13.3337 25.6667Z" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M25.3338 7L18.1338 14.2" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M25.3337 7H18.667" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M25.333 7V13.6667" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    <Defs>
    <ClipPath id="clip0_6098_108875">
    <Rect width={width} height={height} fill={color}/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default MaleIcon


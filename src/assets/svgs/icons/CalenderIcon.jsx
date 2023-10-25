
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const CalenderIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M16 3V7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M8 3V7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M4 11H20" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M10 15H8V17H10V15Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
  )
}

export default CalenderIcon
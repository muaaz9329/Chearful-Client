
import React from 'react'
import {Svg ,Circle, Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const TickIcon = ({width , height , color}) => {
  return (
<Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_6083_108045)">
<Path d="M2.5 17.5H17.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M4.16699 17.5V5.83333L10.8337 2.5V17.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M4.16699 17.5V5.83333L10.8337 2.5V17.5" fill={color}/>
<Path d="M15.833 17.5V9.16666L10.833 5.83333" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.5 7.5V7.50833" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.5 10V10.0083" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.5 12.5V12.5083" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M7.5 15V15.0083" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_6083_108045">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>



  )
}

export default TickIcon


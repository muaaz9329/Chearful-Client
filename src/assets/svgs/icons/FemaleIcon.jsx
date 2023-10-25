
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const FemaleIcon = ({width , height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_6098_108902)">
<Path d="M15.9997 18.6667C19.6816 18.6667 22.6663 15.6819 22.6663 12C22.6663 8.3181 19.6816 5.33334 15.9997 5.33334C12.3178 5.33334 9.33301 8.3181 9.33301 12C9.33301 15.6819 12.3178 18.6667 15.9997 18.6667Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M16 18.6667V28" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M12 24H20" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_6098_108902">
<Rect width="32" height="32" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default FemaleIcon


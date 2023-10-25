
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const SearchIcon = ({height,width,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7248_733)">
<Path d="M9.16699 1.66669C13.307 1.66669 16.667 5.02669 16.667 9.16669C16.667 13.3067 13.307 16.6667 9.16699 16.6667C5.02699 16.6667 1.66699 13.3067 1.66699 9.16669C1.66699 5.02669 5.02699 1.66669 9.16699 1.66669ZM9.16699 15C12.3895 15 15.0003 12.3892 15.0003 9.16669C15.0003 5.94335 12.3895 3.33335 9.16699 3.33335C5.94366 3.33335 3.33366 5.94335 3.33366 9.16669C3.33366 12.3892 5.94366 15 9.16699 15ZM16.2378 15.0592L18.5953 17.4159L17.4162 18.595L15.0595 16.2375L16.2378 15.0592Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7248_733">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>

    
  )
}

export default SearchIcon


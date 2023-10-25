import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Circle, Path, G, Rect, ClipPath, Defs,Mask } from "react-native-svg";

const Logout : React.FC<IconProps> = ({width,height,color}) => {
  return (
<Svg width={width} height={height} viewBox="0 0 20 20" fill="none" >
<G clip-path="url(#clip0_40_1144)">
<Path d="M11.6667 6.66659V4.99992C11.6667 4.55789 11.4911 4.13397 11.1785 3.82141C10.866 3.50885 10.442 3.33325 10 3.33325H4.16667C3.72464 3.33325 3.30072 3.50885 2.98816 3.82141C2.67559 4.13397 2.5 4.55789 2.5 4.99992V14.9999C2.5 15.4419 2.67559 15.8659 2.98816 16.1784C3.30072 16.491 3.72464 16.6666 4.16667 16.6666H10C10.442 16.6666 10.866 16.491 11.1785 16.1784C11.4911 15.8659 11.6667 15.4419 11.6667 14.9999V13.3333" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5.83325 10H17.4999M17.4999 10L14.9999 7.5M17.4999 10L14.9999 12.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_40_1144">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default Logout

const styles = StyleSheet.create({})
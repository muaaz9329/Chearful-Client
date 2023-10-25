import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const InstaBtn = ({width , height , color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_6083_108195)">
<Path d="M13.333 4.00476H6.66634C4.82539 4.00476 3.33301 5.49714 3.33301 7.33809V14.0048C3.33301 15.8457 4.82539 17.3381 6.66634 17.3381H13.333C15.174 17.3381 16.6663 15.8457 16.6663 14.0048V7.33809C16.6663 5.49714 15.174 4.00476 13.333 4.00476Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10 13.1714C11.3807 13.1714 12.5 12.0521 12.5 10.6714C12.5 9.29071 11.3807 8.17142 10 8.17142C8.61929 8.17142 7.5 9.29071 7.5 10.6714C7.5 12.0521 8.61929 13.1714 10 13.1714Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M13.75 6.92142V6.92242" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_6083_108195">
<Rect width="20" height="20" fill="white" transform="translate(0 0.671417)"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default InstaBtn

const styles = StyleSheet.create({})
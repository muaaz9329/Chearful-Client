import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Circle, Path, G, Rect, ClipPath, Defs,Mask } from "react-native-svg";

const SlipDate = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<G opacity="0.7">
<Mask id="mask0_8606_164313" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
<Rect width={width} height={height} fill="#D9D9D9"/>
</Mask>
<G mask="url(#mask0_8606_164313)">
<Path d="M3.60039 14.4001C3.26706 14.4001 2.98386 14.2806 2.75079 14.0417C2.51719 13.8028 2.40039 13.5222 2.40039 13.2001V4.4001C2.40039 4.07796 2.51719 3.79743 2.75079 3.5585C2.98386 3.31956 3.26706 3.2001 3.60039 3.2001H4.80039V1.6001H6.00039V3.2001H10.0004V1.6001H11.2004V3.2001H12.4004C12.7337 3.2001 13.0169 3.31956 13.25 3.5585C13.4836 3.79743 13.6004 4.07796 13.6004 4.4001V13.2001C13.6004 13.5222 13.4836 13.8028 13.25 14.0417C13.0169 14.2806 12.7337 14.4001 12.4004 14.4001H3.60039ZM3.60039 13.2001H12.4004V7.2001H3.60039V13.2001Z" fill={color}/>
</G>
</G>
</Svg>

  )
}

export default SlipDate

const styles = StyleSheet.create({})
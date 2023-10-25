import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Circle, Path, G, Rect, ClipPath, Defs,Mask } from "react-native-svg";

const Tick = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Mask id="mask0_8606_166227" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
<Rect width="20" height="20" fill="#D9D9D9"/>
</Mask>
<G mask="url(#mask0_8606_166227)">
<Path d="M7.95837 14.9998L3.20837 10.2498L4.39587 9.06234L7.95837 12.6248L15.6042 4.979L16.7917 6.1665L7.95837 14.9998Z" fill={color}/>
</G>
</Svg>

  )
}

export default Tick

const styles = StyleSheet.create({})
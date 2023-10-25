import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G , Path , Defs , ClipPath , Rect} from 'react-native-svg'

const ChevronRight = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_9047_205223)">
<Path d="M7.5 15L12.5 10L7.5 5" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<ClipPath id="clip0_9047_205223">
<Rect width="20" height="20" fill="white" transform="translate(20 20) rotate(-180)"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default ChevronRight

const styles = StyleSheet.create({})
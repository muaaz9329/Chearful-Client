import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G , Path , Defs , ClipPath , Rect} from 'react-native-svg'

const ChevronLeft = ({width,height,color}) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clip-path="url(#clip0_6121_110583)">
      <Path
        d="M12.5 5L7.5 10L12.5 15"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_6121_110583">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default ChevronLeft

const styles = StyleSheet.create({})
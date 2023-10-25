import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Path,G,Defs,ClipPath, Rect} from 'react-native-svg'

const Eye2 = ({width,height,color}) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width={width} height={height} viewBox="0 0 24 24" stroke-width="2" stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round">
   <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
   <Path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></Path>
   <Path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></Path>
</Svg>
  )
}

export default Eye2

const styles = StyleSheet.create({})
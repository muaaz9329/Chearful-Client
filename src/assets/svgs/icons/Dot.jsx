import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Circle} from 'react-native-svg'
const Dot = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="2" cy="2" r="2" fill={color} fill-opacity="0.4"/>
</Svg>

  )
}

export default Dot

const styles = StyleSheet.create({})
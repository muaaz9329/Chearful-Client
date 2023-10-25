import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,G,Path,Defs,ClipPath,Rect} from 'react-native-svg'
const ListIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7628_1951)">
<Path d="M11 4H21V6H11V4ZM11 8H17V10H11V8ZM11 14H21V16H11V14ZM11 18H17V20H11V18ZM3 4H9V10H3V4ZM5 6V8H7V6H5ZM3 14H9V20H3V14ZM5 16V18H7V16H5Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7628_1951">
<Rect width={width} height={height} fill="white"/>
</ClipPath>
</Defs>
</Svg>

    
  )
}

export default ListIcon

const styles = StyleSheet.create({})
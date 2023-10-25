import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,G,Path,Defs,Rect,ClipPath} from 'react-native-svg'
const CloseBtnIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_6396_133583)">
    <Path d="M9.99962 8.82166L14.1246 4.69666L15.303 5.87499L11.178 9.99999L15.303 14.125L14.1246 15.3033L9.99962 11.1783L5.87462 15.3033L4.69629 14.125L8.82129 9.99999L4.69629 5.87499L5.87462 4.69666L9.99962 8.82166Z" fill={color}/>
    </G>
    <Defs>
    <ClipPath id="clip0_6396_133583">
    <Rect width={width} height={height} fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default CloseBtnIcon

const styles = StyleSheet.create({})
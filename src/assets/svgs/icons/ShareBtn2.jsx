import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G , Path , Defs , ClipPath , Rect} from 'react-native-svg'

const ShareBtn2 = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_8606_166180)">
    <Path d="M8.33333 2.5V4.16667H4.16667V15.8333H15.8333V11.6667H17.5V16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V3.33333C2.5 3.11232 2.5878 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5H8.33333ZM14.7558 6.4225L10 11.1783L8.82167 10L13.5775 5.24417L10.8333 2.5H17.5V9.16667L14.7558 6.4225Z" fill={color}/>
    </G>
    <Defs>
    <ClipPath id="clip0_8606_166180">
    <Rect width="20" height="20" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default ShareBtn2

const styles = StyleSheet.create({})
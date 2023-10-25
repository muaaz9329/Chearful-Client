import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , G , Path , Defs , ClipPath , Rect} from 'react-native-svg'
const ShareBtn = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_6083_108212)">
    <Path d="M5.00781 13.1714C6.38852 13.1714 7.50781 12.0521 7.50781 10.6714C7.50781 9.29071 6.38852 8.17142 5.00781 8.17142C3.6271 8.17142 2.50781 9.29071 2.50781 10.6714C2.50781 12.0521 3.6271 13.1714 5.00781 13.1714Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M15.0078 8.17142C16.3885 8.17142 17.5078 7.05213 17.5078 5.67142C17.5078 4.29071 16.3885 3.17142 15.0078 3.17142C13.6271 3.17142 12.5078 4.29071 12.5078 5.67142C12.5078 7.05213 13.6271 8.17142 15.0078 8.17142Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M15.0078 18.1714C16.3885 18.1714 17.5078 17.0521 17.5078 15.6714C17.5078 14.2907 16.3885 13.1714 15.0078 13.1714C13.6271 13.1714 12.5078 14.2907 12.5078 15.6714C12.5078 17.0521 13.6271 18.1714 15.0078 18.1714Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M7.25781 9.58809L12.7578 6.75476" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M7.25781 11.7548L12.7578 14.5881" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    <Defs>
    <ClipPath id="clip0_6083_108212">
    <Rect width="20" height="20" fill="white" transform="translate(0.0078125 0.671417)"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default ShareBtn

const styles = StyleSheet.create({})
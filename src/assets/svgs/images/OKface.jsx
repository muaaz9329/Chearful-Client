import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs,Circle} from 'react-native-svg'
const OKface = ({width,height,mouthColor,eyelashesColor,eyesColor,faceColor}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G style="mix-blend-mode:luminosity">
    <Path d="M35.7985 18.37C35.7985 27.9955 27.9955 35.7985 18.37 35.7985C8.7445 35.7985 0.9415 27.9955 0.9415 18.37C0.9415 8.7445 8.7445 0.9415 18.37 0.9415C27.9955 0.9415 35.7985 8.7445 35.7985 18.37Z" fill={faceColor} stroke="white" stroke-width="1.883"/>
    <Path d="M11.3291 18.7375C13.02 18.7375 14.3908 17.3667 14.3908 15.6758C14.3908 13.9849 13.02 12.6141 11.3291 12.6141C9.63821 12.6141 8.26746 13.9849 8.26746 15.6758C8.26746 17.3667 9.63821 18.7375 11.3291 18.7375Z" fill={eyesColor}/>
    <Path d="M25.4133 18.7375C27.1042 18.7375 28.475 17.3667 28.475 15.6758C28.475 13.9849 27.1042 12.6141 25.4133 12.6141C23.7224 12.6141 22.3516 13.9849 22.3516 15.6758C22.3516 17.3667 23.7224 18.7375 25.4133 18.7375Z" fill={eyesColor}/>
    <Path d="M22.5959 28.1674H14.1457C13.2272 28.1674 13.2272 25.718 14.1457 25.718H22.5347C23.5144 25.718 23.5144 28.1674 22.5959 28.1674Z" fill={mouthColor}/>
    </G>
    </Svg>
    
  )
}

export default OKface

const styles = StyleSheet.create({})
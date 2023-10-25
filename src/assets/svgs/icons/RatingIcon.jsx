import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Path,G,Defs,ClipPath, Rect} from 'react-native-svg'
const RatingIcon = ({width,color,height}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_7947_215)">
    <Path d="M3.783 2.826L12 1L20.217 2.826C20.4391 2.87536 20.6377 2.99897 20.78 3.1764C20.9224 3.35384 21 3.57452 21 3.802V13.789C20.9999 14.7767 20.756 15.7492 20.2899 16.62C19.8238 17.4908 19.1499 18.2331 18.328 18.781L12 23L5.672 18.781C4.85027 18.2332 4.17646 17.4911 3.71035 16.6205C3.24424 15.7498 3.00024 14.7776 3 13.79V3.802C3.00004 3.57452 3.07764 3.35384 3.21999 3.1764C3.36234 2.99897 3.56094 2.87536 3.783 2.826ZM12 13.5L14.939 15.045L14.378 11.773L16.755 9.455L13.469 8.977L12 6L10.53 8.977L7.245 9.455L9.622 11.773L9.062 15.045L12 13.5Z" fill={color}/>
    </G>
    <Defs>
    <ClipPath id="clip0_7947_215">
    <Rect width="24" height="24" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  )
}

export default RatingIcon

const styles = StyleSheet.create({})
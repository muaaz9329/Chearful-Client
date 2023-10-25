import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs,Circle} from 'react-native-svg'

const Happyface = ({width,height,mouthColor,eyelashesColor,eyesColor,faceColor}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G style="mix-blend-mode:luminosity">
    <Path d="M36.0675 18.3697C36.0675 27.9951 28.2646 35.798 18.6393 35.798C9.01392 35.798 1.21103 27.9951 1.21103 18.3697C1.21103 8.74439 9.01392 0.9415 18.6393 0.9415C28.2646 0.9415 36.0675 8.74439 36.0675 18.3697Z" fill={faceColor} stroke="white" stroke-width="1.883"/>
    <Path d="M11.598 16.8389C13.2889 16.8389 14.6596 15.4682 14.6596 13.7773C14.6596 12.0864 13.2889 10.7157 11.598 10.7157C9.90711 10.7157 8.53638 12.0864 8.53638 13.7773C8.53638 15.4682 9.90711 16.8389 11.598 16.8389Z" fill={eyesColor}/>
    <Path d="M25.6822 16.8389C27.3731 16.8389 28.7438 15.4682 28.7438 13.7773C28.7438 12.0864 27.3731 10.7157 25.6822 10.7157C23.9913 10.7157 22.6205 12.0864 22.6205 13.7773C22.6205 15.4682 23.9913 16.8389 25.6822 16.8389Z" fill={eyesColor}/>
    <Path d="M29.0494 22.0438C29.0494 21.554 28.7432 20.9416 27.9472 20.7579C25.8041 20.3293 22.6812 19.9619 18.6399 19.9619C14.5985 19.9619 11.4757 20.3905 9.33253 20.7579C8.53651 20.9416 8.23035 21.554 8.23035 22.0438C8.23035 26.5138 11.6594 30.9838 18.6399 30.9838C25.6204 30.9838 29.0494 26.5138 29.0494 22.0438Z" fill={mouthColor}/>
    </G>
    </Svg>
    
  )
}

export default Happyface

const styles = StyleSheet.create({})
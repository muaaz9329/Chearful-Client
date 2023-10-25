import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,G,Path,Defs,ClipPath,Rect} from 'react-native-svg'

const StarIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7221_112290)">
<Path d="M11.9989 17.75L5.82686 20.995L7.00586 14.122L2.00586 9.25495L8.90586 8.25495L11.9919 2.00195L15.0779 8.25495L21.9779 9.25495L16.9779 14.122L18.1569 20.995L11.9989 17.75Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7221_112290">
<Rect width="24" height="24" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default StarIcon

const styles = StyleSheet.create({})
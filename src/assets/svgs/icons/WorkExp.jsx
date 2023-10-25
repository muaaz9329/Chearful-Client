import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Path,G,Defs,ClipPath, Rect} from 'react-native-svg'
const WorkExp = ({width,color,height}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7247_112611)">
<Path d="M7.33496 5V2C7.33496 1.73478 7.44032 1.48043 7.62785 1.29289C7.81539 1.10536 8.06974 1 8.33496 1H16.335C16.6002 1 16.8545 1.10536 17.0421 1.29289C17.2296 1.48043 17.335 1.73478 17.335 2V5H21.335C21.6002 5 21.8545 5.10536 22.0421 5.29289C22.2296 5.48043 22.335 5.73478 22.335 6V20C22.335 20.2652 22.2296 20.5196 22.0421 20.7071C21.8545 20.8946 21.6002 21 21.335 21H3.33496C3.06974 21 2.81539 20.8946 2.62785 20.7071C2.44032 20.5196 2.33496 20.2652 2.33496 20V6C2.33496 5.73478 2.44032 5.48043 2.62785 5.29289C2.81539 5.10536 3.06974 5 3.33496 5H7.33496ZM4.33496 15V19H20.335V15H4.33496ZM11.335 11V13H13.335V11H11.335ZM9.33496 3V5H15.335V3H9.33496Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7247_112611">
<Rect width="24" height="24" fill="white" transform="translate(0.334961)"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default WorkExp

const styles = StyleSheet.create({})
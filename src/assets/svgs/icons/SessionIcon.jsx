import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg,Path,G,Defs,ClipPath, Rect} from 'react-native-svg'
const SessionIcon = ({width,height,color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7247_112375)">
<Path d="M17.665 9.2L22.878 5.55C22.953 5.49746 23.0409 5.4665 23.1323 5.4605C23.2236 5.4545 23.3149 5.4737 23.3961 5.51599C23.4772 5.55829 23.5453 5.62206 23.5927 5.70035C23.6401 5.77865 23.6651 5.86846 23.665 5.96V18.04C23.6651 18.1315 23.6401 18.2214 23.5927 18.2996C23.5453 18.3779 23.4772 18.4417 23.3961 18.484C23.3149 18.5263 23.2236 18.5455 23.1323 18.5395C23.0409 18.5335 22.953 18.5025 22.878 18.45L17.665 14.8V19C17.665 19.2652 17.5597 19.5196 17.3721 19.7071C17.1846 19.8946 16.9303 20 16.665 20H2.66504C2.39982 20 2.14547 19.8946 1.95793 19.7071C1.7704 19.5196 1.66504 19.2652 1.66504 19V5C1.66504 4.73478 1.7704 4.48043 1.95793 4.29289C2.14547 4.10536 2.39982 4 2.66504 4H16.665C16.9303 4 17.1846 4.10536 17.3721 4.29289C17.5597 4.48043 17.665 4.73478 17.665 5V9.2ZM5.66504 8V10H7.66504V8H5.66504Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7247_112375">
<Rect width="24" height="24" fill="white" transform="translate(0.665039)"/>
</ClipPath>
</Defs>
</Svg>

  )
}

export default SessionIcon

const styles = StyleSheet.create({})
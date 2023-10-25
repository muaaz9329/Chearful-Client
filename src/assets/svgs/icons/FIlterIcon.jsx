

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Svg , Path ,G ,Rect ,ClipPath , Defs} from 'react-native-svg'
const FilterIcon = ({width , height , color}) => {
  return (
<Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_7248_738)">
<Path d="M17.4997 15V17.5H15.833V15H14.1663V13.3333H19.1663V15H17.4997ZM4.16634 15V17.5H2.49967V15H0.833008V13.3333H5.83301V15H4.16634ZM9.16634 5V2.5H10.833V5H12.4997V6.66667H7.49967V5H9.16634ZM9.16634 8.33333H10.833V17.5H9.16634V8.33333ZM2.49967 11.6667V2.5H4.16634V11.6667H2.49967ZM15.833 11.6667V2.5H17.4997V11.6667H15.833Z" fill={color}/>
</G>
<Defs>
<ClipPath id="clip0_7248_738">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>


  )
}

export default FilterIcon

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@app/constants'
import { Wp } from '@app/utils'
import AppText from '../../../../../components/ui/app-text';

type Props = {}

const RecommendedTag = (props: Props) => {
  return (
    <View style={{
        paddingHorizontal: Wp(10),
        paddingVertical: Wp(5),
        backgroundColor:Colors.orangeDim,
        borderRadius:Wp(16),
    }}>
      <AppText size="sm" style={{
          color:Colors.orange,
      }}>Recommended</AppText>
    </View>
  )
}

export default RecommendedTag

const styles = StyleSheet.create({})
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import ms from '@app/assets/master-styles';
import { ChevronLeft, ChevronRight } from '@app/assets/svgs';
import { IsTablet, Wp } from '@app/utils';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { Colors } from '@app/constants';
import { AppText } from '@app/components';
import { IconChevronDown } from 'tabler-icons-react-native';


const MonthSelection = ({
  onPressPreviousMonth,
  onPressNextMonth,
  text,
}: {
  onPressPreviousMonth: () => void;
  onPressNextMonth: () => void;
  text: string;
}) => {
  return (
    <View style={ms(['flexRow', 'justifyBetween', 'alignCenter'])}>
      <Pressable
        style={ms([
          'bg_secondary',
          'px:10',
          'py:10',
          'rounded-2',
          IsTablet && ['px:6', 'py:6', 'rounded-1'],
        ])}
        onPress={onPressPreviousMonth}
      >
        <ChevronLeft
          width={IsTablet ? Wp(12) : Wp(20)}
          height={IsTablet ? Wp(12) : Wp(20)}
          color={Colors.primary}
        />
      </Pressable>
      <Pressable style={ms(['alignCenter', 'flexRow'])}>
        <AppText style={ms(['nunito_700', 'mr:2'])} size="md">
          {text}
        </AppText>
        
      </Pressable>
      <Pressable
        style={ms([
          'bg_secondary',
          'px:10',
          'py:10',
          'rounded-2',
          IsTablet && ['px:6', 'py:6', 'rounded-1'],
        ])}
        onPress={onPressNextMonth}
      >
        <ChevronRight
          width={IsTablet ? Wp(12) : Wp(20)}
          height={IsTablet ? Wp(12) : Wp(20)}
          color={Colors.primary}
        />
      </Pressable>
    </View>
  );
};

export default MonthSelection;

const styles = StyleSheet.create({});

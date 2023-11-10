import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@app/assets/global-styles';
import AppText from '../../../../../components/ui/app-text';
import ms from '@app/assets/master-styles';
import { Wp } from '@app/utils';
import { ViewStyle } from 'react-native-size-matters';
import { Colors } from '@app/constants';

type Props = {};

const WeeklyCalender = (props: Props) => {


  const selectedDay: ViewStyle = {
    borderRadius: Wp(25),
    backgroundColor: Colors.greenDim,
  };
 

  const [selected, setSelected] = useState<
    {
      day: number;
      isSelected: boolean;
    }[]
  >([
    { day: 0, isSelected: false },
    { day: 1, isSelected: false },
    { day: 2, isSelected: false },
    { day: 3, isSelected: false },
    { day: 4, isSelected: false },
    { day: 5, isSelected: false },
    { day: 6, isSelected: false },
  ]);

  const handleCalenderPress = (day: number) => {
    if (selected[day]?.isSelected) {
      // for unselecting the day
      setSelected(
        selected.map((item) => {
          if (item.day === day) {
            return { ...item, isSelected: false };
          }
          return item;
        }),
      );
    } else {
      // for selecting only one day at a time
      setSelected(
        selected.map((item) => {
          if (item.day === day) {
            return { ...item, isSelected: true };
          }
          return { ...item, isSelected: false };
        }),
      );
    }
  };

  return (
    <View style={ms(['flexRow', 'justifyAround'])}>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((item, index) => {
        return (
          <Pressable
            style={ms([
              'alignCenter',
              'alignSelfStart',
              'px_8',
              'py_10',
              selected[index]?.isSelected && (selectedDay as any),
            ])}
            onPress={() => handleCalenderPress(index)}
            key={index}
          >
            <AppText style={[globalStyles.nunito_700,{textTransform:'uppercase'}]}>{item}</AppText>
            <AppText style={globalStyles.mt_18}>26</AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default WeeklyCalender;

const styles = StyleSheet.create({});

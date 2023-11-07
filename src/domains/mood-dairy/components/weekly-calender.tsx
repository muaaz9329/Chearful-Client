import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '@app/assets/global-styles';
import AppText from '../../../components/ui/app-text';
import ms from '@app/assets/master-styles';
import { Wp } from '@app/utils';
import { ViewStyle } from 'react-native-size-matters';
import { Colors } from '@app/constants';

type Props = {};

const WeeklyCalender = (props: Props) => {
  // const [selectedDay, setSelectedDay] = React.useState<number>(0);
  // const dayRef = useRef<[]>([]);
  // for (let i = 0; i < 7; i++) {
  //   dayRef.current[i] = React.createRef();
  // }

  const selectedDay: ViewStyle = {
    borderRadius: Wp(25),
    backgroundColor: Colors.greenDim,
  };
  // const handleCalenderPress = (day:number)=>{
  //   //FOR SELECTING THE DAY
  //   dayRef.current[day].current?.setNativeProps({style:selectedDay})
  //   //FOR UNSELECTING THE DAY
  //   dayRef.current[day].current?.setNativeProps({style:{backgroundColor:'white'}})
  //   //remove the old selected day styles

  // }

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
        }
        ),

      );
    }
  };

  return (
    <SafeAreaView>
      <View style={ms(['flexRow', 'justifyAround'])}>
        {new Array(7).fill(0).map((_, index) => {
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
            >
              <AppText style={globalStyles.nunito_700}>SUN</AppText>
              <AppText style={globalStyles.mt_18}>26</AppText>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default WeeklyCalender;

const styles = StyleSheet.create({});

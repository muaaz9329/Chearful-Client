import globalStyles from '@app/assets/global-styles';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';
import { Colors } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';
import MonthSelection from './month-selection';
import useMoodDiaryFilter from '../hooks/use-mood-diary-filter';

const WeeklyCalendar = ({
  handleDateChange,
  currentWeek,
  setCurrentWeek,
  selectedDate,
  setSelectedDate
}:{
  handleDateChange: (date: Date) => void;
  currentWeek: Date;
  setCurrentWeek: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
 
  const { isMoodFilledOnDate } = useMoodDiaryFilter();
  const selectedDay: ViewStyle = {
    borderRadius: Wp(25),
    backgroundColor: Colors.greenDim,
  };
  const getDaysInWeek = (date: any) => {
    const daysArray = [];
    const currentDay = new Date(date);
    const startDay = new Date(currentDay);

    // Move back to the previous Monday
    startDay.setDate(currentDay.getDate() - ((currentDay.getDay() + 6) % 7));

    for (let i = 0; i < 7; i++) {
      daysArray.push(new Date(startDay));
      startDay.setDate(startDay.getDate() + 1);
    }

    return daysArray;
  };

  const previousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const handleDayClick = (day: any) => {
    setSelectedDate(day);
    handleDateChange(day);
  };

  const renderWeek = () => {
    const daysArray = getDaysInWeek(currentWeek);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <View>
        <MonthSelection
          text={`${currentWeek.toLocaleDateString('default', {
            month: 'long',
          })} ${currentWeek.getFullYear()}`}
          onPressNextMonth={nextWeek}
          onPressPreviousMonth={previousWeek}
        />

        <View
          style={ms([
            'flexRow',
            IsTablet && ['alignSelfCenter'],
            'justifyAround',
          ])}
        >
          {daysArray.map((day, i) => {
            const todayDate = new Date();
            const indexDate = daysArray[i];

            const hasMood = isMoodFilledOnDate(day, true);

            return (
              <TouchableOpacity
                key={day.getDate()}
                onPress={() => {
                  handleDayClick(day);
                }}
                style={ms([
                  'alignCenter',
                  'alignSelfStart',
                  //@ts-ignore
                  indexDate > todayDate && { opacity: 0.5 },
                  'py:2',
                  'W:50',

                  'mt_10',
                  IsTablet && ['W:40', 'mt:5'],
                ])}
                disabled={indexDate > todayDate}
              >
                <View
                  style={ms([
                    'alignCenter',
                    'py:8',
                    'W:45',
                    hasMood && {
                      borderRadius: Wp(25),
                      backgroundColor: Colors.orangeDim,
                    },
                    //@ts-ignore
                    selectedDate &&
                    selectedDate.toDateString() === day.toDateString()
                      ? selectedDay
                      : {},
                    IsTablet && ['W:35'],
                  ])}
                >
                  <AppText
                    style={[
                      globalStyles.nunito_700,
                      { textTransform: 'uppercase' },
                      indexDate > todayDate && { opacity: 0.5 },
                    ]}
                  >
                    {dayNames[i]}
                  </AppText>
                  <AppText style={[globalStyles.mt_18]}>
                    {day.getDate()}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return <View>{renderWeek()}</View>;
};

export default React.memo(WeeklyCalendar);

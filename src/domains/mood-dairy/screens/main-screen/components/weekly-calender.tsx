import globalStyles from '@app/assets/global-styles';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';
import { Colors } from '@app/constants';
import { Wp } from '@app/utils';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';
import MonthSelection from './month-selection';

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedDay: ViewStyle = {
    borderRadius: Wp(25),
    backgroundColor: Colors.greenDim,
  };
  const getDaysInWeek = (date: any) => {
    const daysArray = [];
    const currentDay = new Date(date);
    const startDay = new Date(currentDay);
    startDay.setDate(currentDay.getDate() - currentDay.getDay()); // Move back to Sunday of the current week

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
    console.log(day); // Log the selected date
  };

  const renderWeek = () => {
    const daysArray = getDaysInWeek(currentWeek);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View>
        <MonthSelection
          text={`${currentWeek.toLocaleDateString('default', {
            month: 'long',
          })} ${currentWeek.getFullYear()}`}
          onPressNextMonth={nextWeek}
          onPressPreviousMonth={previousWeek}
        />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {daysArray.map((day, i) => {
            const todayDate = new Date();
            const indexDate = daysArray[i];
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
                  'py_10',
                  {
                    padding: 5,
                    width: Wp(55),
                  },
                  //@ts-ignore
                  selectedDate &&
                  selectedDate.toDateString() === day.toDateString()
                    ? selectedDay
                    : {},
                ])}
                disabled={indexDate > todayDate}
              >
                {/* <Text>{dayNames[i]+" "}{day.getDate()}</Text> */}

                <AppText
                  style={[
                    globalStyles.nunito_700,
                    { textTransform: 'uppercase' },
                    indexDate > todayDate && { opacity: 0.5 },
                  ]}
                >
                  {dayNames[i]}
                </AppText>
                <AppText
                  style={[
                    globalStyles.mt_18,
                    // indexDate > todayDate && { opacity: 0.5 },
                  ]}
                >
                  {day.getDate()}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return <View>{renderWeek()}</View>;
};

export default WeeklyCalendar;

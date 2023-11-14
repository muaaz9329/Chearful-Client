import globalStyles from '@app/assets/global-styles';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';
import { Colors } from '@app/constants';
import { Wp } from '@app/utils';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import MonthSelection from './month-selection';

const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  };

  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const handleDayClick = (day: any) => {
    setSelectedDate(day);
    console.log(day); // Log the selected date
  };

  const renderMonth = () => {
    const daysArray = getDaysInMonth(currentMonth);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfMonth = daysArray[0].getDay(); // Get the day of the week for the 1st of the month

    // Create empty spaces to align the first day of the month
    const emptySpaces = new Array(firstDayOfMonth).fill(null);

    return (
      <View>
         <MonthSelection
          text={`${currentMonth.toLocaleDateString('default', {
            month: 'long',
          })} ${currentMonth.getFullYear()}`}
          onPressNextMonth={nextMonth}
          onPressPreviousMonth={previousMonth}
        />
       
        <View style={ms(['flexRow'])}>
          {dayNames.map((day) => (
            <View
              key={day}
              style={ms([
                'alignCenter',
                'alignSelfStart',
                'mt_10',
                'py_10',
                {
                
                  width: Wp(50),
                },
              ])}
            >
              <AppText
                style={[
                  globalStyles.nunito_700,
                  { textTransform: 'uppercase' },
                ]}
              >
                {day}
              </AppText>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {emptySpaces.map((_, index) => (
            <Text key={`empty${index}`}></Text>
          ))}
          {daysArray.map((day, i) => {
            const todayDate = new Date();
            const indexDate = daysArray[i];
            return (
              <TouchableOpacity
                key={day.getDate()}
                onPress={() => handleDayClick(day)}
                style={[
                  {
                    
                    paddingVertical: Wp(10),
                    width: Wp(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  indexDate > todayDate && { opacity: 0.5 },

                  selectedDate &&
                    selectedDate.toDateString() === day.toDateString() && {
                      borderRadius: Wp(16),
                      backgroundColor: Colors.greenDim,
                    },
                ]}
                disabled={indexDate > todayDate}
              >
                <Text>{day.getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return <View>{renderMonth()}</View>;
};

export default MonthlyCalendar;

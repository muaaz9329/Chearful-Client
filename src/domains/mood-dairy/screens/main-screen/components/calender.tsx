import globalStyles from '@app/assets/global-styles';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';
import { Colors } from '@app/constants';
import { Nunito, Wp } from '@app/utils';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import MonthSelection from './month-selection';
import useMainScreen from '../hooks/use-main-screen';
import useMoodDiaryFilter from '../hooks/use-mood-diary-filter';


const MonthlyCalendar = ({
  selectedDate,
  setSelectedDate,
}:{
  selectedDate:Date,
  setSelectedDate:(date:Date)=>void
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { isMoodFilledOnDate } = useMoodDiaryFilter();


  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // Get the number of days in that month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      // pushing the date object from start of the month to end of the month
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
  };

//   useEffect(() => {
//       let moodData : any[]
//       const TempData = {...ClientMoodDiaryResultByDate}
//      moodData = TempData[formatDate(selectedDate)]
//       if( moodData!==undefined){
//         console.log("I ran")
//        setMoodData(moodData)
//       }


    

    
//   }, [selectedDate]);


//   useEffect(()=>{
// console.log(selectedDate)
//   },[selectedDate]) 

  const renderMonth = () => {
    const daysArray = getDaysInMonth(currentMonth);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const firstDayOfMonth = daysArray[0].getDay(); // Get the day of the week for the 1st of the month

    // Create empty spaces to align the first day of the month
    const emptySpaces = new Array((firstDayOfMonth + 6) % 7).fill(null);

    return (
      <View>
        <MonthSelection
          text={`${currentMonth.toLocaleDateString('default', {
            month: 'long',
          })} ${currentMonth.getFullYear()}`}
          onPressNextMonth={nextMonth}
          onPressPreviousMonth={previousMonth}
        />

        <View
          style={ms([
            'flexRow',
            {
              justifyContent: 'space-between',
            },
          ])}
        >
          {dayNames.map((day) => (
            <View
              key={day}
              style={ms([
                'alignCenter',
                'alignSelfStart',

                'py_10',
                {
                  width: Wp(49),

                  alignSelf: 'center',
                },
                'justifyAround',
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

        <View
          style={[
            { flexDirection: 'row', flexWrap: 'wrap' },
            {
              alignSelf: 'center',
            },
          ]}
        >
          {emptySpaces.map((_, index) => (
            <Text
              style={{
                paddingHorizontal: Wp(10),
                width: Wp(51.3),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={`empty${index}`}
            ></Text>
          ))}
          {daysArray.map((day, i) => {
            const todayDate = new Date();
            const indexDate = daysArray[i];
            //check weather the date is present in global state as day mood diary added
            //*If yes then add a dot below the date
            //!If no then do nothing
            //@ts-ignore
            const hasMood = isMoodFilledOnDate(day);

            return (
              <TouchableOpacity
                key={day.getDate()}
                onPress={() => handleDayClick(day)}
                style={[
                  styles.dateCont,
                  indexDate > todayDate && { opacity: 0.5 },
                ]}
                disabled={indexDate > todayDate}
              >
                <View
                  style={[
                    styles.dateBlob,
                    hasMood && {
                      borderRadius: Wp(16),
                      backgroundColor: Colors.orangeDim,
                    },

                    selectedDate &&
                      selectedDate.toDateString() === day.toDateString() && {
                        borderRadius: Wp(16),
                        backgroundColor: Colors.greenDim,
                      },
                  ]}
                >
                  <Text style={{
                    fontFamily:Nunito(500),
                    fontSize:Wp(14),
                    color:'#000000'
                  }}>{day.getDate()}</Text>
                </View>
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

const styles = StyleSheet.create({
  dateCont: {
    paddingHorizontal: Wp(2),
    paddingVertical: Wp(2),
    width: Wp(51),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBlob: {
    paddingHorizontal: Wp(8),
    paddingVertical: Wp(8),
    width: Wp(40),
    alignItems: 'center',
  },
});

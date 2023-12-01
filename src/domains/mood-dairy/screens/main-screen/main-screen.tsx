import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { AppText, Header, Heading, MyButton } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@app/assets/svgs';
import { IconComponent } from '@app/types';
import { IconDotsVertical, IconPlus } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';
import { IsTablet, Wp, getAuthHeaders, hp, wp } from '@app/utils';
import WeeklyCalender from './components/weekly-calender';
import MoodCard from './components/mood-card';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import MoodSelection from './components/mood-selection';
import MonthlyCalendar from './components/calender';
import useApi from './hooks/use-api';
import RoundLoading from '@app/components/round-loading';
import RequestFailure from '@app/components/request-failure';
import useMainScreen from './hooks/use-main-screen';
import useMoodDiaryFilter from './hooks/use-mood-diary-filter';
import apiService from '@app/services/api-service/api-service';

type Props = {};

const MainScreen = (props: Props) => {
  const navigation = useNavigation();
  const bottomSheetRef = React.useRef<ActionSheetRef>(null);
  const bottomSheetRef2 = React.useRef<ActionSheetRef>(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [calenderType, setCalenderType] = React.useState<'weekly' | 'monthly'>(
    'weekly',
  );

  const { loading, moodData, reloadScreen } = useApi();
  // const {selectedDate,setSelectedDate} = useDateControl()
  const [moodDiaryData, setMoodDiaryData] = React.useState<{
    data: [] | ClientMoodDiaryResult;
  }>({
    data: [],
  });
  // const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const { formatDate } = useMoodDiaryFilter();

  const getMoodDiaryData = async (MoodDate: Date) => {
    getAuthHeaders().then((headers) => {
      apiService.post({
        data: {
          date: `${formatDate(MoodDate, calenderType === 'weekly' && true)}`,
        },
        url: `/website/mood-diary/mood-entries-by-calender-view`,
        onSuccess: (...res) => {
          setMoodDiaryData({
            data: Object.values(
              res[0].client_mood_diary_result_by_date,
            ).flat() as ClientMoodDiaryResult | [],
          });
          
        },
        onFailure: (err) => {
          console.log(err);
        },
        headers,
      });
    });
  };
  useEffect(() => {
    getMoodDiaryData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = useCallback((date: Date) => {
    getMoodDiaryData(date);
  }, []);

  return (
    <SafeAreaView style={ms(['Wrapper'])} edges={['top', 'bottom']}>
      <RoundLoading loading={loading}>
        <View
          style={[
            styles.btnCont,
            IsTablet && {
              bottom: Wp(10),
            },
          ]}
        >
          <MyButton
            title="Add Current Mood"
            style={ms([
              'py_12',
              styles.btnRadius,
              IsTablet && ['py_8', 'W:250', 'alignSelfCenter'],
            ])}
            icon={
              <IconPlus
                size={IsTablet ? Wp(12) : Wp(20)}
                color="white"
                //@ts-ignore
                style={ms(['mr:2'])}
              />
            }
            onPress={() => bottomSheetRef.current?.show()}
          />
        </View>
        <Header
          navigation={navigation}
          Icon={ChevronLeft as IconComponent}
          headerType="New"
          pram="back"
        >
          <View
            style={ms(['justifyBetween', 'alignCenter', 'w-full', 'flexRow'])}
          >
            <Heading style={ms(['ml:6'])}>Mood Dairy</Heading>
            <Pressable
              onPress={() => {
                bottomSheetRef2.current?.show();
              }}
            >
              <IconDotsVertical
                size={IsTablet ? Wp(16) : Wp(24)}
                color={Colors.primary}
              />
            </Pressable>
          </View>
        </Header>
        <View style={ms(['topMargin'])}></View>
        <View style={ms(['topMargin'])}>
          {calenderType === 'weekly' ? (
            <WeeklyCalender
              {...{ handleDateChange }}
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              reloadScreen={reloadScreen}
            />
          ) : (
            <MonthlyCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              reloadScreen={reloadScreen}
            />
          )}
        </View>
        <View style={ms(['topMargin'])}>
          <AppText size="md" style={ms(['mb_10', 'py_15'])}>
            {selectedDate.toDateString().split(' ')[0] +
              ', ' +
              selectedDate.toDateString().split(' ')[1] +
              ' ' +
              selectedDate.toDateString().split(' ')[2] +
              ' ' +
              selectedDate.toDateString().split(' ')[3]}
          </AppText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              IsTablet && {
                width: wp(55),
                alignSelf: 'center',
              }
            }
          >
            <View>
              {
                // @ts-ignore
                moodDiaryData?.data?.map((item: ClientMoodDiaryResult, i) => {
                  return (
                    <MoodCard
                      key={i}
                      mood={item.mood_diary.slug}
                      date={new Date(item.created_at)}
                      rating={Number(item.score)}
                    />
                  );
                })
              }
            </View>
          </ScrollView>
        </View>
      </RoundLoading>
      <ActionSheet
        containerStyle={styles.bottomSheetStyles}
        ref={bottomSheetRef}
      >
        <MoodSelection
          moodEmojis={moodData?.mood_diaries}
          navigation={navigation}
          closeSheet={() => bottomSheetRef.current?.hide()}
        />
      </ActionSheet>
      <ActionSheet containerStyle={styles.bottomSheet2} ref={bottomSheetRef2}>
        <Heading style={ms(['textMuted'])}>Views</Heading>
        <View style={ms(['flexRow', 'alignCenter', 'justifyCenter'])}>
          <MyButton
            title="Monthly"
            style={ms(['py_12', 'px:50', 'mr:10', 'mt_10'])}
            onPress={() => {
              bottomSheetRef2.current?.hide();
              setCalenderType('monthly');
            }}
          />
          <MyButton
            title="Weekly"
            style={ms(['py_12', 'px:50', 'mr:10', 'mt_10'])}
            onPress={() => {
              bottomSheetRef2.current?.hide();
              setCalenderType('weekly');
            }}
          />
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  bottomSheet2: {
    height: hp(20),
    backgroundColor: Colors.white,
    borderTopLeftRadius: Wp(20),
    borderTopRightRadius: Wp(20),
    paddingTop: Wp(30),
    paddingHorizontal: Wp(20),
  },
  btnRadius: {
    borderRadius: Wp(40),
  },
  bottomSheetStyles: {
    height: hp(35),
    backgroundColor: Colors.white,
    borderTopLeftRadius: Wp(20),
    borderTopRightRadius: Wp(20),
    paddingTop: Wp(30),
  },
  btnCont: {
    position: 'absolute',
    bottom: Wp(25),
    alignSelf: 'center',
    width: '90%',
    zIndex: 10,
  },
});

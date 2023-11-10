import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { AppText, Header, Heading, MyButton } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@app/assets/svgs';
import { IconComponent } from '@app/types';
import { IconDotsVertical, IconPlus } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';
import { Wp, hp } from '@app/utils';
import MonthSelection from './components/month-selection';
import WeeklyCalender from './components/weekly-calender';
import MoodCard from './components/mood-card';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import MoodSelection from './components/mood-selection';

type Props = {};

const MainScreen = (props: Props) => {
  const navigation = useNavigation();
  const bottomSheetRef = React.useRef<ActionSheetRef>(null);
  return (
    <SafeAreaView style={ms(['Wrapper'])} edges={['top', 'bottom']}>
      <View style={styles.btnCont}>
        <MyButton
          title="Add Current Mood"
          style={ms([
            'py_12',
            {
              borderRadius: Wp(40),
            },
          ])}
          icon={
            <IconPlus
              size={Wp(20)}
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
          <Pressable>
            <IconDotsVertical size={Wp(24)} color={Colors.primary} />
          </Pressable>
        </View>
      </Header>
      <View style={ms(['topMargin'])}>
        <MonthSelection />
      </View>
      <View style={ms(['topMargin'])}>
        <WeeklyCalender />
      </View>
      <View style={ms(['topMargin'])}>
        <AppText size="md" style={ms(['mb_10', 'py_15'])}>
          Tue, 10 July 2023
        </AppText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {new Array(5).fill(0).map((item, index) => {
              return (
                <MoodCard
                  key={index}
                  mood="happy"
                  date={new Date()}
                  rating={5}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ActionSheet
      containerStyle={styles.bottomSheetStyles}
      ref={bottomSheetRef}
       >
        <MoodSelection/>
        </ActionSheet>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  bottomSheetStyles: {
    height:hp(35),
    backgroundColor:Colors.white,
    borderTopLeftRadius:Wp(20),
    borderTopRightRadius:Wp(20),
    paddingTop:Wp(30),
  },
  btnCont: {
    position: 'absolute',
    bottom: Wp(25),
    alignSelf: 'center',
    width: '90%',
  },
});

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
import MonthlyCalendar from './components/calender';

type Props = {};

const MainScreen = (props: Props) => {
  const navigation = useNavigation();
  const bottomSheetRef = React.useRef<ActionSheetRef>(null);
  const bottomSheetRef2 = React.useRef<ActionSheetRef>(null);
  const [calenderType, setCalenderType] = React.useState<'weekly' | 'monthly'>('weekly');
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
          <Pressable onPress={()=>{
            bottomSheetRef2.current?.show()
          }}>
            <IconDotsVertical size={Wp(24)} color={Colors.primary} />
          </Pressable>
        </View>
      </Header>
      <View style={ms(['topMargin'])}>
        
      </View>
      <View style={ms(['topMargin'])}>
       {
          calenderType === 'weekly' ? <WeeklyCalender/> : <MonthlyCalendar/>
       }
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
        <ActionSheet
      containerStyle={{
        height:hp(20),
        backgroundColor:Colors.white,
    borderTopLeftRadius:Wp(20),
    borderTopRightRadius:Wp(20),
    paddingTop:Wp(30),
    paddingHorizontal:Wp(20),
      }}
      ref={bottomSheetRef2}
        >
        <Heading style={ms(['textMuted'])}>
          Views
        </Heading>
        <View style={ms(['flexRow','alignCenter','justifyCenter'])}>
        <MyButton
        title='Monthly'
        style={ms(['py_12','px:50','mr:10','mt_10'])}
        onPress={()=>{
          bottomSheetRef2.current?.hide()
          setCalenderType('monthly')
        }}
        />
         <MyButton
        title='Weekly'
        style={ms(['py_12','px:50','mr:10','mt_10'])}
        onPress={()=>{
          bottomSheetRef2.current?.hide()
          setCalenderType('weekly')
        }
        }
        />
   
        </View>
        
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

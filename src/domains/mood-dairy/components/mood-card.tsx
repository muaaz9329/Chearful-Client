import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moodDiaryImages } from '../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { IconChevronRight } from 'tabler-icons-react-native';
import { Wp, capitalizeFirstLetter, formatDateTo12HourTime } from '@app/utils';
import { AppText } from '@app/components';
import Dot from '@app/assets/svgs/icons/Dot';
import { Colors } from '@app/constants';

type Props = {};

const images = {
  happy: moodDiaryImages.happy,
  sad: moodDiaryImages.sad,
  angry: moodDiaryImages.angry,
  peaceful: moodDiaryImages.peaceful,
  neutral: moodDiaryImages.neutral,
};

const MoodCard = ({
  mood = 'happy',
  date = new Date(),
  rating = 4.5,
}: {
  mood: 'happy' | 'sad' | 'angry' | 'peaceful' | 'neutral';
  date: Date;
  rating: number;
}) => {
  return (
    <SafeAreaView>
      <View
        style={ms([
          'flexRow',
          'justifyBetween',
          'alignCenter',
          'bg_cont',
          'px:12',
          'py_10',
          'br:14',
        ])}
      >
        <View style={ms(['flexRow', 'alignCenter'])}>
            <Image source={images[mood]} style={ms(['mx:4','W:30' ,'H:30' ])}  />
            <AppText size='base' style={ms(['textPrimary','mulish_600' , 'mr:5'])} >{`${capitalizeFirstLetter(mood)} (${rating}/10)`}</AppText>
            <Dot width={Wp(5)} height={Wp(5)} color={Colors.primary} />
            <AppText size='base' style={ms(['textMuted','mulish_600' , 'ml:5'])} >{formatDateTo12HourTime(date)}</AppText>
        </View>
        <View>
          <IconChevronRight size={Wp(25)} color={'#000'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MoodCard;

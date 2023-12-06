import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moodDiaryImages } from '../../../assets/images';
import ms from '@app/assets/master-styles';
import { IconChevronRight } from 'tabler-icons-react-native';
import { Wp, capitalizeFirstLetter, formatDateTo12HourTime } from '@app/utils';
import { AppText } from '@app/components';
import Dot from '@app/assets/svgs/icons/Dot';
import { Colors } from '@app/constants';
import { IsTablet } from '../../../../../utils/utils-responsiveness';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {};

export const images = {
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
  handleFunc,
  id
}: {
  mood: MoodTypes;
  date: Date;
  rating: number;
  handleFunc :(id:number)=>void
  id:number
}) => {
  return (
    <TouchableOpacity
      style={ms([
        'flexRow',
        'justifyBetween',
        'alignCenter',
        'bg_cont',
        'px:12',
        'py_10',
        'br:14',
        'my:5',
        IsTablet && ['px:8', 'py_6', 'my:3', 'br:8'],
      ])}
      onPress={()=>{
        handleFunc(id)
      }}
    >
      <View style={ms(['flexRow', 'alignCenter'])}>
        <Image
          source={images[mood]}
          style={ms(['mx:4', 'W:30', 'H:30', IsTablet && ['W:20', 'H:20']])}
        />
        <AppText
          size="base"
          style={ms(['textPrimary', 'mulish_600', 'mr:5'])}
        >{`${capitalizeFirstLetter(mood)} (${rating}/10)`}</AppText>
        <Dot
          width={IsTablet ? Wp(2.5) : Wp(5)}
          height={IsTablet ? Wp(2.5) : Wp(5)}
          color={Colors.primary}
        />
        <AppText size="base" style={ms(['textMuted', 'mulish_600', 'ml:5'])}>
          {formatDateTo12HourTime(date)}
        </AppText>
      </View>
      <View>
        <IconChevronRight size={IsTablet ? Wp(16) : Wp(25)} color={'#000'} />
      </View>
    </TouchableOpacity>
  );
};

export default MoodCard;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { Image } from 'react-native';
import { MoodTypes, images } from '../screens/main-screen/components/mood-card';
import { Wp } from '@app/utils';
import { Colors } from '@app/constants';
import { AppText, Heading } from '@app/components';

export const MoodText = {
  happy: 'Happy',
  sad: 'Sad',
  angry: 'Angry',
  peaceful: 'Peaceful',
  neutral: 'Neutral',
};

const MoodBox = ({ mood = 'happy' }: { mood: MoodTypes }) => {
  return (
    <View style={styles.emojiCont}>
      <View style={ms(['px:10', 'py:10', styles.boxShadow, 'bg_white'])}>
        <Image source={images[mood]} style={styles.emojiImageStyles} />
      </View>
      <Heading size="lg" style={ms(['textCenter', 'mt:5'])}>
        {MoodText[mood]}
      </Heading>
    </View>
  );
};

export default MoodBox;

const styles = StyleSheet.create({
  emojiImageStyles: {
    width: Wp(64),
    height: Wp(64),
    resizeMode: 'contain',
  },
  emojiCont: {
    position: 'absolute',
    top: -Wp(60),
    alignSelf: 'center',
    zIndex:10
  },
  boxShadow: {
    borderRadius: Wp(24),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

import {
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import { IsTablet, Wp } from '@app/utils';
import { moodDiaryImages } from '../../../assets/images';
import { isTablet } from 'react-native-device-info';

type Props = {};

function EmojiBtn({
  imagePath,
  text,
  emojiHeight = 60,
  emojiWidth = 60,
}: {
  imagePath: ImageRequireSource;
  text: string;
  onPress?: () => void;
  emojiWidth?: number;
  emojiHeight?: number;
}) {
  return (
    <TouchableOpacity
      style={ms([
        'alignCenter',
        'justifyCenter',
        'alignSelfStart',
        {
          marginVertical: Wp(10),
        },
      ])}
    >
      <Image
        style={[
          styles.emojiImageStyles,
          {
            height: Wp(emojiHeight),
            width: Wp(emojiWidth),
            resizeMode: 'cover',
          },
        ]}
        source={imagePath}
      />
      <AppText size="lg">{text}</AppText>
    </TouchableOpacity>
  );
}

const MoodSelection = (props: Props) => {
  return (
    <View>
      <Heading style={ms(['nunito_500', 'textCenter'])} size={'lg'}>
        What do you feel right now ?
      </Heading>
      <View style={ms(['flexRow', 'flexWrap', 'justifyAround', 'mt_15' , IsTablet && {width:'60%' , alignSelf:'center'}])}>
        <EmojiBtn
          imagePath={moodDiaryImages.happy}
          text={'Happy'}
          emojiWidth={IsTablet ? 30 : 60}
          emojiHeight={IsTablet ? 30 : 60}
        />
        <EmojiBtn
          imagePath={moodDiaryImages.peaceful}
          text={'Peaceful'}
          emojiWidth={IsTablet ? 30 : 60}
          emojiHeight={IsTablet ? 30 : 60}
        />
        <EmojiBtn
          imagePath={moodDiaryImages.sad}
          text={'Sad'}
          emojiWidth={IsTablet ? 30 : 60}
          emojiHeight={IsTablet ? 30 : 60}
        />
        <EmojiBtn
          imagePath={moodDiaryImages.angry}
          text={'Angry'}
          emojiWidth={IsTablet ? 30 : 60}
          emojiHeight={IsTablet ? 30 : 60}
        />
        <EmojiBtn
          imagePath={moodDiaryImages.neutral}
          text={'Neutral'}
          emojiWidth={IsTablet ? 30 : 60}
          emojiHeight={IsTablet ? 30 : 60}
        />
      </View>
    </View>
  );
};

export default MoodSelection;

const styles = StyleSheet.create({
  emojiImageStyles: {
    resizeMode: 'contain',
    marginBottom: Wp(5),
    marginHorizontal: Wp(20),
  },
});

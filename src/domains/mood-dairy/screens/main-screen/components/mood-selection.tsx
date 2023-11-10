import {
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import { Wp } from '@app/utils';
import { moodDiaryImages } from '../../../assets/images';


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
      style={ms(['alignCenter', 'justifyCenter', 'alignSelfStart' , {
        marginVertical:Wp(10),
      }])}
    >
      <Image
        style={{
          height: Wp(emojiHeight),
          width: Wp(emojiWidth),
          resizeMode: 'contain',
          marginBottom: Wp(5),
          marginHorizontal:Wp(20),
          
        }}
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
      <View style={ms(['flexRow' , 'flexWrap' , 'justifyAround' , 'mt_15'])}>
      <EmojiBtn imagePath={moodDiaryImages.happy} text={'Happy'} />
      <EmojiBtn imagePath={moodDiaryImages.peaceful} text={'Peaceful'} />
      <EmojiBtn imagePath={moodDiaryImages.sad} text={'Sad'} />
      <EmojiBtn imagePath={moodDiaryImages.angry} text={'Angry'} />
      <EmojiBtn imagePath={moodDiaryImages.neutral} text={'Neutral'} />
      
      </View>
      </View>
      
   
  );
};

export default MoodSelection;

const styles = StyleSheet.create({});

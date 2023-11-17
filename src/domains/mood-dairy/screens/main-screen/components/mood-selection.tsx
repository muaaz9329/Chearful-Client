import {
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback } from 'react';

import { AppText, Heading } from '@app/components';
import ms from '@app/assets/master-styles';
import { IsTablet, Wp } from '@app/utils';
import { moodDiaryImages } from '../../../assets/images';

import { NavigationHelpers, NavigationProp } from '@react-navigation/native';
import { MoodDiaryNavigator } from '@app/domains/mood-dairy/navigation';

function EmojiBtn({
  imagePath,
  text,
  emojiHeight = 60,
  emojiWidth = 60,
  onPress,
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
      onPress={onPress}
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

const MoodSelection = ({
  moodEmojis,
  navigation,
  closeSheet,
}: {
  moodEmojis?: MoodDiary[];
  navigation?: NavigationProp<any, any>;
  closeSheet?: () => void;
}) => {
  const handleNavigation = useCallback((item: MoodDiary) => {
    navigation?.navigate(MoodDiaryNavigator.AddMood, {
      mood: item.slug,
    });
    closeSheet?.();
  }, []);

  return (
    <View>
      <Heading style={ms(['nunito_500', 'textCenter'])} size={'lg'}>
        What do you feel right now ?
      </Heading>
      <View
        style={ms([
          'flexRow',
          'flexWrap',
          'justifyAround',
          'mt_15',
          IsTablet && { width: '60%', alignSelf: 'center' },
        ])}
      >
        {moodEmojis &&
          moodEmojis.map((item, index) => {
            return (
              <EmojiBtn
                key={index}
                //@ts-ignore
                imagePath={moodDiaryImages[String(item.slug)]}
                text={item.title}
                onPress={() => handleNavigation(item)}
              />
            );
          })}
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

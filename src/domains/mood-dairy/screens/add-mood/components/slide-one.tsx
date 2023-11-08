import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { Heading } from '@app/components';
import VerticalSlider from '@app/modules/vertical-slider/src';
import { Colors } from '@app/constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Wp } from '@app/utils';
import { moodDiaryImages } from '@app/domains/mood-dairy/assets/images';

type Props = {};

const SlideOne = (props: Props) => {
  const [value, setValue] = React.useState(5);
  return (
    <View style={ms(['alignCenter', 'flex1', 'mt:40'])}>
      <Heading style={ms(['nunito_500'])} size="xl">
        Tell us how strongly you feel
      </Heading>
      <Heading style={ms(['nunito_500', 'my_12'])} size="xl">
        {Math.round(value)}/10
      </Heading>
      <GestureHandlerRootView>
        <VerticalSlider
          height={Wp(290)}
          width={Wp(50)}
          value={value}
          min={0}
          max={10}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.light}
          borderRadius={40}
          onChange={(val) => setValue(val)}
          showEmoji
          EmojiComponent={() => {
            return (
              <View style={styles.emojiCont}>
                <Image
                  source={moodDiaryImages.happy}
                  style={styles.EmojiStyles}
                />
              </View>
            );
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default SlideOne;

const styles = StyleSheet.create({
  emojiCont: {
    width: Wp(45),
    height: Wp(45),
    borderRadius: Wp(50),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Wp(3),
  },

  EmojiStyles: {
    width: Wp(40),
    height: Wp(40),
    resizeMode: 'contain',
  },
});

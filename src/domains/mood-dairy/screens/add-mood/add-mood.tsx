import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, Header, Heading } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@app/assets/svgs';
import { IconComponent } from '@app/types';
import ms from '@app/assets/master-styles';
import { IsTablet, Wp, wp } from '@app/utils';
import { Colors } from '@app/constants';
import MoodBox from '../../components/mood-box';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import SlideOne from './components/slide-one';
import SlideTwo from './components/slide-two';
import SlideThree from './components/slide-three';
import { IconArrowLeft, IconArrowRight } from 'tabler-icons-react-native';
import RoundButton from '@app/components/round-button';

const AddMood = () => {
  const navigation = useNavigation();
  const CarouselRef = React.useRef<ICarouselInstance>(null);
  const [index, setIndex] = React.useState(0);

  const handleNext = () => {
    if (index === 2) {
      console.log('done');
    } else {
      CarouselRef.current?.next();
    }
  };

  const handlePrev = () => {
    CarouselRef.current?.prev();
  };

  return (
    <SafeAreaView style={ms(['bg_cont', 'flex1'])} edges={['top']}>
      <View style={ms(['px_16', 'mt_10'])}>
        <Header
          pram={'back'}
          navigation={navigation}
          Icon={ChevronLeft as IconComponent}
          headerType="New"
        >
          <Heading style={ms(['ml:6'])}>Add Mood</Heading>
        </Header>
      </View>

      <View style={ms(['flex1', 'flexColumn', 'flexColumnReverse'])}>
        <View style={ms([styles.bottomCont, 'bg_white'])}>
          <MoodBox mood="happy" />
          <View style={styles.CarouselCont}>
            <Carousel
              width={wp(100)}
              data={[1, 2, 3]}
              style={styles.CarouselStyles}
              loop={false}
              ref={CarouselRef}
              enabled={false}
              onScrollEnd={(index) => setIndex(index)}
              renderItem={({ item }) => {
                if (item === 1) {
                  return <SlideOne />;
                } else if (item == 2) {
                  return <SlideTwo />;
                } else {
                  return <SlideThree />;
                }
              }}
            />

            <View></View>
          </View>
          <View style={ms(['flexRow', 'justifyAround'])}>
            <RoundButton bgColor={Colors.muted} onPress={() => handlePrev()}>
              <IconArrowLeft size={IsTablet ? Wp(15) : Wp(20)} color={'#fff'} />
            </RoundButton>

            <RoundButton bgColor={Colors.primary} onPress={() => handleNext()}>
              {index < 2 ? (
                <IconArrowRight
                  size={IsTablet ? Wp(15) : Wp(20)}
                  color={'#fff'}
                />
              ) : (
                <AppText size="lg" style={ms(['textWhite', 'mulish_700'])}>
                  Save
                </AppText>
              )}
            </RoundButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMood;

const styles = StyleSheet.create({
  CarouselStyles: {
    height: '96%',
    width: '100%',
  },
  CarouselCont: {
    justifyContent: 'flex-end',
    flex: 0.95,
  },
  bottomCont: {
    flex: 0.89,
    borderTopLeftRadius: Wp(26),
    borderTopRightRadius: Wp(26),
  },
});

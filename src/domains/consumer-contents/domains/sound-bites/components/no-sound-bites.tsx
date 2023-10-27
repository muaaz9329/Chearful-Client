import { AppImages } from '@app/assets/images';
import { Colors, Fonts } from '@app/constants';
import { Wp } from '@app/utils';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoSoundBites = () => {
  return (
    <View style={styles.cont}>
      <Image source={AppImages.noSoundbite} style={styles.imgStyles} />
      <Text style={styles.TitleStyle}>
        Our studio is still working on this topic...
      </Text>
      <Text style={styles.subTitle}>
        In the mean time we urge you to explore the other topics we have covered
      </Text>
    </View>
  );
};

export default NoSoundBites;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignSelf: 'center',
    marginTop: Wp(100),
  },
  subTitle: {
    fontFamily: Fonts.Nunito['400'],
    fontSize: Wp(14),
    textAlign: 'center',
    marginTop: Wp(10),
    paddingHorizontal: Wp(20),
    color: '#7C7C7C',
  },
  TitleStyle: {
    fontFamily: Fonts.Nunito['700'],
    fontSize: Wp(20),
    textAlign: 'center',
    marginTop: Wp(20),
    paddingHorizontal: Wp(40),
    color: Colors.primary,
  },
  imgStyles: {
    width: Wp(200),
    height: Wp(200),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});

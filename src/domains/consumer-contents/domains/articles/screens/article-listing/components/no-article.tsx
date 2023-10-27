import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import { Colors, Fonts } from '@app/constants';
import { Wp } from '@app/utils';
import { AppImages } from '@app/assets/images';

const NoArticle = () => {
  return (
    <View style={styles.cont}>
      <Image source={AppImages.noArticle} style={styles.imgStyles} />
      <Text style={styles.TitleStyle}>We didn’t find out searched article</Text>
    </View>
  );
};

export default NoArticle;

const styles = StyleSheet.create({
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
    height: Wp(100),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cont: {
    flex: 1,
    alignSelf: 'center',
    marginTop: Wp(100),
  },
});

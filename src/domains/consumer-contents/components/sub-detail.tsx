import { AuthorCont } from '@app/components';
import { Colors, Fonts } from '@app/constants';
import { IsTablet, Wp, constructDate, decodeHTML } from '@app/utils';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { Text } from 'react-native-paper';

function SubDetail({
  AuthorName,
  date,
  description,
  title,
  openBottomSheet,
  TextStyle = 'SoundBites',
  authorImg,
}: {
  title: string;
  description: string;
  AuthorName: string;
  date?: string;
  openBottomSheet?: () => void;
  TextStyle?: 'Article' | 'SoundBites';
  authorImg?: string;
}) {
  return (
    <View style={[styles.BottomCont, IsTablet && styles.BottomCont_tablet]}>
      {date && (
        <View style={[styles.marginTop, IsTablet && styles.marginTop_Tablet]}>
          <AuthorCont
            name={AuthorName}
            date={constructDate(new Date(date)).Date}
            TextColor={TextStyle === 'Article' ? 'white' : 'black'}
            image={{ uri: authorImg }}
          />
        </View>
      )}
      <View style={[styles.marginTop, IsTablet && styles.marginTop_Tablet]}>
        <Text
          style={[
            styles.titleStyle,
            IsTablet && styles.titleStyles_tablet,
            TextStyle === 'Article' && { color: Colors.white },
          ]}
        >
          {decodeHTML(title)}
        </Text>
      </View>

      <View style={[styles.marginTop, IsTablet && styles.marginTop_Tablet]}>
        <Text
          style={[
            styles.subtitleStyles,
            IsTablet && styles.subtitleStyles_Tablet,
            TextStyle === 'Article' && { color: Colors.white },
          ]}
        >
          {decodeHTML(description).length > 78
            ? decodeHTML(description).slice(0, 78) + '...'
            : decodeHTML(description)}
          <Text
            onPress={() => {
              // @ts-ignore
              openBottomSheet();
            }}
            style={{
              fontFamily: Fonts.Mulish['800'],
              color: TextStyle === 'Article' ? Colors.white : Colors.black,
            }}
          >
            Read More
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SubDetail;

const styles = StyleSheet.create({
  BottomCont_tablet: {
    bottom: Wp(20),
    paddingLeft: Wp(10),
  },
  subtitleStyles_Tablet: {
    fontSize: Wp(8),
  },
  titleStyles_tablet: {
    fontSize: Wp(12),
  },

  marginTop: {
    marginTop: Wp(10),
  },
  subtitleStyles: {
    fontFamily: Fonts.Mulish['400'],
    fontSize: Wp(14),
  },
  titleStyle: {
    fontFamily: Fonts.Nunito['700'],
    fontSize: Wp(18),
    color: Colors.primary,
  },
  BottomCont: {
    position: 'absolute',
    bottom: Wp(40),
    paddingLeft: Wp(20),
  },
  marginTop_Tablet: {
    marginTop: Wp(6),
  },
});

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationHelpers, useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { DEFAULT_DATA_SOUNDBITES } from '../constants';
import {
  IsPhone,
  IsTablet,
  Wp,
  decodeHTML,
  isSvgExtension,
  wp,
} from '@app/utils';
import { Colors, Fonts } from '@app/constants';
import { AppNavigator } from '@app/navigation/app-navigation';
import { ConsumerContentsNavigator } from '@app/domains/consumer-contents/navigation/consumer-contents-navigation';
import { SoundbitesNavigator } from '../navigation/soundbites-navigation-stack';

type Props = {
  navigation?: NavigationHelpers<any, any>;
  data?: ISoundBitesDetail;
  style?: 'default' | 'Home Design';
};

const SoundBitesCard = ({
  data = DEFAULT_DATA_SOUNDBITES,
  style = 'default',
}: Props) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    // @ts-ignore
    // navigation.navigate("sound-bites-detail", { id: data?.id });
    navigation?.navigate(AppNavigator.ConsumerContents, {
      screen: ConsumerContentsNavigator.SoundBites,
      params: {
        screen: SoundbitesNavigator.SoundBitesDetail,
        params: {
          id: data?.id,
        },
      }, // Pass the id as a parameter
    }); // Navigate to the sound-bites screen from other stacks of screen
  };
  if (style === 'default') {
    return (
      <Pressable
        onPress={handleNavigation}
        style={[styles.Cont, IsTablet && styles.Cont_tablet]}
      >
        {isSvgExtension(data?.image as string) ? (
          <View style={[styles.SvgImg, IsTablet && styles.SvgImg_Tablet]}>
            <SvgUri
              width={IsTablet ? Wp(65) : Wp(90)}
              height={IsTablet ? Wp(65) : Wp(100)}
              uri={data?.image as string}
              style={[IsPhone && { marginLeft: Wp(5) }]}
            />
          </View>
        ) : (
          <Image
            source={{ uri: data?.image as string }}
            style={[
              styles.soundBitesImg,
              IsTablet && styles.soundBitesImg_tablet,
            ]}
          />
        )}
        <View style={[styles.Cont2, IsTablet && styles.Cont2_tablet]}>
          <View>
            <Text style={[styles.title, IsTablet && styles.title_tablet]}>
              {
                // @ts-ignore
                data?.title.length > 22
                  ? decodeHTML(data?.title.slice(0, 22) + '...')
                  : decodeHTML(data?.title as string)
              }
            </Text>
            <Text
              style={[
                styles.AuthorTextStyle,
                IsTablet && styles.AuthorTextStyle_tablet,
              ]}
            >
              Posted by {data?.author.first_name} {data?.author.last_name}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.AuthorTextStyle,
                IsTablet && styles.AuthorTextStyle_tablet,
              ]}
            >
              {
                // @ts-ignore
                decodeHTML(
                  // @ts-ignore
                  (data?.excerpt.length > 60
                    ? data?.excerpt.slice(0, 60) + '...'
                    : data?.excerpt) as string,
                )
              }
            </Text>
          </View>
        </View>
      </Pressable>
    );
  } //* Second Style of SoundBites Card
  else {
    return (
      <Pressable
        style={[
          styles.styles2_cont,
          IsTablet && {
            width: wp(48),
            padding: Wp(8),
          },
        ]}
        onPress={handleNavigation}
      >
        {isSvgExtension(data?.image as string) ? (
          <View
            style={[
              styles.styles2_SvgImg,
              IsTablet && {
                width: Wp(40),
                height: Wp(50),
                borderRadius: Wp(6),
              },
            ]}
          >
            <SvgUri
              width={IsTablet ? Wp(40) : Wp(90)}
              height={IsTablet ? Wp(60) : Wp(100)}
              uri={data?.image as string}
              style={[IsPhone && { marginLeft: Wp(5) }]}
            />
          </View>
        ) : (
          <Image
            source={{ uri: data?.image as string }}
            style={[
              styles.styles2_imgStyles,
              IsTablet && {
                width: Wp(40),
                height: Wp(50),
                borderRadius: Wp(6),
              },
            ]}
          />
        )}
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View>
            <Text style={[styles.title, IsTablet && styles.title_tablet]}>
              {
                // @ts-ignore
                data?.title.length > 16
                  ? decodeHTML(data?.title.slice(0, 16) + '...')
                  : decodeHTML(data?.title as string)
              }
            </Text>
            <View
              style={{
                marginTop: Wp(3),
              }}
            >
              <Text
                style={[
                  styles.AuthorTextStyle,
                  IsTablet && styles.AuthorTextStyle_tablet,
                ]}
              >
                Posted by {data?.author.first_name} {data?.author.last_name}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={[
                styles.AuthorTextStyle,
                IsTablet && styles.AuthorTextStyle_tablet,
              ]}
            >
              {
                // @ts-ignore
                decodeHTML(
                  // @ts-ignore
                  (data?.excerpt.length > 45
                    ? data?.excerpt.slice(0, 45) + '...'
                    : data?.excerpt) as string,
                )
              }
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }
};

export default SoundBitesCard;

const styles = StyleSheet.create({
  styles2_imgStyles: {
    width: Wp(80),
    height: Wp(100),
    resizeMode: 'cover',
    borderRadius: Wp(12),
    marginRight: Wp(12),
  },
  styles2_SvgImg: {
    width: Wp(80),
    height: Wp(100),
    borderRadius: Wp(12),
    marginRight: Wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  styles2_cont: {
    flexDirection: 'row',
    width: wp(75),
    padding: Wp(12),
    borderRadius: Wp(12),
    marginRight: Wp(12),
    backgroundColor: Colors.light,
    alignSelf: 'flex-start',
  },
  AuthorTextStyle_tablet: {
    fontSize: Wp(8),
    marginTop: Wp(3),
  },
  title_tablet: {
    fontSize: Wp(10),
  },
  Cont2_tablet: {
    width: wp(40),
  },
  soundBitesImg_tablet: {
    width: Wp(50),
    height: Wp(50),
    resizeMode: 'cover',
    borderRadius: Wp(10),
    marginRight: Wp(6),
  },
  SvgImg_Tablet: {
    width: Wp(50),
    height: Wp(50),
    borderRadius: Wp(10),
    marginRight: Wp(6),
  },
  Cont_tablet: {
    padding: Wp(7),
    borderRadius: Wp(10),
    marginVertical: Wp(3),
    width: wp(60),
  },
  SvgImg: {
    width: Wp(75),
    height: Wp(75),
    borderRadius: Wp(12),
    marginRight: Wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Cont: {
    padding: Wp(12),
    flexDirection: 'row',
    backgroundColor: Colors.light,
    borderRadius: Wp(12),
    marginVertical: Wp(5),
  },
  soundBitesImg: {
    width: Wp(75),
    height: Wp(75),
    resizeMode: 'cover',
    borderRadius: Wp(12),
    marginRight: Wp(12),
  },
  Cont2: {
    justifyContent: 'space-between',

    width: wp(60),
  },
  title: {
    fontSize: Wp(16),
    fontFamily: Fonts.Nunito['700'],
    color: Colors.primary,
  },
  AuthorTextStyle: {
    fontFamily: Fonts.Mulish['500'],
    fontSize: Wp(12),
    color: Colors.black,
    opacity: 0.7,
    marginTop: Wp(3),
  },
});

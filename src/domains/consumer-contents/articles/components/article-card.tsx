import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import { IsPhone, IsTablet, Wp, wp } from '@app/utils';
import { IconEye } from 'tabler-icons-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  decodeHTML,
  extractFirst100Characters,
  isArabic,
  stripHTML,
} from '@app/utils';
import { TArticle } from '../types';
import DEFAULT_DATA_ARTICLE from '../constants';
import { s } from 'react-native-size-matters';
import { Colors, Fonts } from '@app/constants';

type Props = {
  Data?: TArticle;
  style?: 'default' | 'Home Design';
};

const ArticleCard = ({
  Data = DEFAULT_DATA_ARTICLE,
  style = 'default',
}: Props) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    // @ts-ignore
    // navigation?.navigate("article", {
    //   screen: "article-detail",
    //   params: { id: Data?.id }, // Pass the id as a parameter
    // });
    navigation?.navigate('content-stack', {
      screen: 'article',
      params: {
        screen: 'article-detail',
        params: {
          id: Data?.id,
        },
      }, // Pass the id as a parameter
    }); // Navigate to the sound-bites screen from other stacks of screen

    const isArabicText = {
      title: isArabic(decodeHTML(stripHTML(Data.title))),
      description: isArabic(stripHTML(Data.description)),
    };
    console.log(isArabicText);
  };

  if (style === 'default') {
    return (
      <Pressable
        style={[
          styles.Parent,
          IsTablet && {
            width: wp(60),
            alignSelf: 'center',
          },
        ]}
        onPress={handleNavigation}
      >
        <ImageBackground
          source={{ uri: Data.image }}
          resizeMode="cover"
          style={{
            height: IsTablet ? Wp(100) : Wp(200),
          }}
        >
          <View style={styles.BgImgCont}>
            <Text
              style={[
                styles.TitleText,
                IsTablet && {
                  fontSize: s(12),
                },
              ]}
            >
              {decodeHTML(Data.title).length > 40
                ? decodeHTML(Data.title).slice(0, 40) + '...'
                : decodeHTML(Data.title)}
            </Text>
            <View style={styles.ViewsCont}>
              <IconEye
                size={IsTablet ? s(9) : s(16)}
                color={Colors.white}
                style={{
                  marginRight: Wp(5),
                }}
              />
              <Text
                style={[
                  styles.ViewStyles,
                  IsTablet && {
                    fontSize: s(8),
                  },
                ]}
              >
                {Data.views} views
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={[
            styles.Cont,
            IsTablet && {
              padding: Wp(8),
            },
          ]}
        >
          <Text
            style={[
              styles.descriptionStyles,
              IsTablet && {
                fontSize: s(8),
              },
            ]}
          >
            {decodeHTML(extractFirst100Characters(Data.description)).length > 78
              ? decodeHTML(extractFirst100Characters(Data.description)).slice(
                  0,
                  78,
                ) + '...'
              : decodeHTML(extractFirst100Characters(Data.description))}
          </Text>
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[
          styles.Parent,
          { width: wp(55), marginRight: Wp(10), alignSelf: 'flex-start' },
          IsTablet && {
            width: wp(30),
            marginRight: Wp(6),
          },
        ]}
        onPress={handleNavigation}
      >
        <ImageBackground
          source={{ uri: Data.image }}
          resizeMode="cover"
          style={{
            height: IsTablet ? Wp(75) : Wp(150),
          }}
        >
          <View style={[styles.BgImgCont, {}]}>
            <Text
              style={[
                styles.TitleText,
                {
                  fontSize: IsTablet ? s(7.5) : s(13),
                },
              ]}
            >
              {decodeHTML(Data.title).length > 25
                ? decodeHTML(Data.title).slice(0, 25) + '...'
                : decodeHTML(Data.title)}
            </Text>
            <View
              style={[
                styles.ViewsCont,
                {
                  alignSelf: 'flex-start',
                  flex: 0.5,
                },
              ]}
            >
              <IconEye
                size={IsTablet ? s(7) : s(14)}
                color={Colors.white}
                style={{
                  marginRight: Wp(5),
                }}
              />
              <Text
                style={[
                  styles.ViewStyles,
                  {
                    fontSize: IsTablet ? s(5) : s(10),
                  },
                ]}
              >
                {Data.views} views
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={[
            styles.Cont,
            IsTablet && {
              padding: Wp(8),
            },
            IsPhone && {
              height: Wp(60),
            },
          ]}
        >
          <Text
            style={[
              styles.descriptionStyles,
              IsTablet && {
                fontSize: s(6),
              },
            ]}
          >
            {decodeHTML(extractFirst100Characters(Data.description)).length >
            (isArabic(decodeHTML(extractFirst100Characters(Data.description)))
              ? 30
              : 50)
              ? decodeHTML(extractFirst100Characters(Data.description)).slice(
                  0,
                  isArabic(
                    decodeHTML(extractFirst100Characters(Data.description)),
                  )
                    ? 30
                    : 50,
                ) + '...'
              : decodeHTML(extractFirst100Characters(Data.description))}
          </Text>
        </View>
      </Pressable>
    );
  }
};

export default ArticleCard;

const styles = StyleSheet.create({
  descriptionStyles: {
    fontFamily: Fonts.Mulish['600'],
    fontSize: s(12),
    color: Colors.black,
  },
  ViewStyles: {
    color: Colors.white,
    fontSize: s(12),
    fontFamily: Fonts.Mulish['400'],
    marginRight: Wp(10),
  },
  ViewsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.35,
  },
  TitleText: {
    color: Colors.white,
    fontSize: s(16),
    fontFamily: Fonts.Nunito['700'],
    flex: 0.95,
  },
  BgImgCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Wp(14),
    paddingVertical: Wp(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    backgroundColor: 'rgba(0,0,0,0.180)',
  },
  Parent: {
    backgroundColor: Colors.light,
    borderRadius: Wp(14),
    overflow: 'hidden',
    marginBottom: Wp(10),
  },
  Cont: {
    padding: Wp(12),
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconEye, IconLink } from 'tabler-icons-react-native';
import RenderHtml from 'react-native-render-html';
import useSocialShare from '../hooks/use-social-share';
import {
  IsPhone,
  IsTablet,
  Wp,
  colorWithOpacity,
  constructDate,
  decodeHTML,
  stripHTML,
  wp,
} from '@app/utils';
import ChipTags from './chip-tags';
import { AuthorCont } from '@app/components';
import SocialBtn from './social-btn';
import { Colors, Fonts } from '@app/constants';
import { AppImages } from '@app/assets/images';

const Detail = ({
  AuthorName,
  date,
  description,
  categories,
  title,
  views,
  link,
  authorImg,
  children,
}: {
  title?: string;
  description?: string;
  AuthorName?: string;
  date?: string;
  categories?: any[];
  views?: number;
  link?: string;
  authorImg?: string;
  children?: React.ReactNode;
}) => {
  const { shareOnFacebook, shareOnLinkedIn, shareLink } = useSocialShare(link!);

  return (
    <SafeAreaView
      style={[styles.SafeAreaStyles, IsTablet && styles.safeAreaStyles_tablet]}
    >
      {children ? (
        children
      ) : (
        <>
          <View style={styles.MarginTop}>
            <Text
              style={[
                styles.TitlesStyles,
                IsTablet && styles.TitleStyles_tablet,
              ]}
            >
              {decodeHTML(title!)}
            </Text>
          </View>
          <View style={styles.MarginTop}>
            <View style={styles.warpFlex}>
              {categories!.map((item, index) => {
                return <ChipTags key={index} value={item.title} />;
              })}
            </View>
          </View>
          <View style={[styles.MarginTop, IsTablet && styles.MarginTop_tablet]}>
            <AuthorCont
              name={AuthorName}
              date={constructDate(new Date(date!)).Date}
              image={{ uri: authorImg }}
            />
          </View>
          <View style={[styles.MarginTop, IsTablet && styles.MarginTop_tablet]}>
            <View style={styles.SocialCont}>
              <View style={styles.flexRow}>
                <IconEye
                  size={IsPhone ? Wp(18) : Wp(12)}
                  color={colorWithOpacity('#000', 0.7)}
                />
                <Text
                  style={[
                    styles.ViewsTextStyles,
                    IsTablet && styles.ViewTestStyles_tablet,
                  ]}
                >
                  {views} views
                </Text>
              </View>

              <View style={styles.flexRow}>
                <SocialBtn
                  img={AppImages.linkedin}
                  onPress={() => {
                    shareOnLinkedIn();
                  }}
                  width={IsPhone ? 20 : 15}
                  height={IsPhone ? 20 : 15}
                />

                <SocialBtn
                  img={AppImages.facebook}
                  onPress={() => {
                    shareOnFacebook();
                  }}
                  width={IsPhone ? 20 : 15}
                  height={IsPhone ? 20 : 15}
                />

                <TouchableOpacity
                  onPress={() => {
                    shareLink();
                  }}
                  style={{
                    marginHorizontal: IsPhone ? Wp(10) : Wp(5),
                  }}
                >
                  <IconLink
                    size={IsPhone ? Wp(20) : Wp(15)}
                    color={colorWithOpacity('#000', 0.7)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.MarginTop, IsTablet && styles.MarginTop_tablet]}>
            <Text
              style={[
                styles.descriptionStyles,
                IsTablet && styles.descriptionStyles_tablet,
              ]}
            >
              {IsTablet ? (
                decodeHTML(stripHTML(description!))
              ) : (
                <RenderHtml
                  source={{ html: description! }}
                  contentWidth={wp(90)}
                />
              )}
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  safeAreaStyles_tablet: {
    width: '70%',
  },
  descriptionStyles_tablet: {
    fontSize: Wp(10),
  },
  ViewTestStyles_tablet: {
    fontSize: Wp(10),
    marginLeft: Wp(2.5),
  },

  TitleStyles_tablet: {
    fontSize: Wp(15),
    textAlign: 'center',
  },
  SafeAreaStyles: {
    paddingHorizontal: Wp(20),
  },

  descriptionStyles: {
    fontFamily: Fonts.Mulish['400'],
    fontSize: Wp(14),
    color: '#000',
  },
  ViewsTextStyles: {
    fontFamily: Fonts.Mulish['400'],
    fontSize: Wp(14),
    marginLeft: Wp(5),
    color: colorWithOpacity('#000', 0.7),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SocialCont: {
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    paddingVertical: Wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warpFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  TitlesStyles: {
    fontFamily: Fonts.Nunito['700'],
    fontSize: Wp(20),
    color: Colors.primary,
  },
  MarginTop: {
    marginTop: Wp(10),
  },
  MarginTop_tablet: {
    marginTop: Wp(5),
  },
});

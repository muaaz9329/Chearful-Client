import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import useResourcesStore from '../hooks/use-resources-store';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SubDetail from '../../components/sub-detail';
import BottomSheet from '../../components/bottom-sheet';
import Detail from '../../components/detail';
import { Divider } from 'react-native-paper';
import ArticleCont from '../../home/components/article-cont';
import { SvgUri } from 'react-native-svg';
import globalStyles from '@app/assets/global-styles';
import { IsTablet, Wp, decodeHTML, hp, stripHTML, wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';
import { BottomSheetRef } from '../../types';
import { AppText, Header, Heading } from '@app/components';

const ListExtraction = (html: any) => {
  try {
    const listItemRegex = /<li[^>]*>(.*?)<\/li>/g;

    // Use the regular expression to extract list items
    const listItems = html.match(listItemRegex);

    // Clean up the extracted list items
    const list = listItems.map((item: any) => {
      // Remove HTML tags and extra whitespace
      return item.replace(/<\/?[^>]+(>|$)/g, '').trim();
    });
    console.log(listItems);

    return list;
  } catch (e) {
    return [];
  }
};

const isInfoList = (item: any[]) => {
  try {
    if (item.length > 0) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

function ListComp(data: string, title: string) {
  return (
    <View style={globalStyles.topMargin}>
      <Text
        style={{
          fontFamily: Fonts.Nunito['700'],
          fontSize: IsTablet ? Wp(13) : Wp(20),
          color: Colors.primary,
          marginBottom: IsTablet ? Wp(5) : Wp(10),
        }}
      >
        {title}
      </Text>

      {isInfoList(ListExtraction(data)) ? (
        ListExtraction(data).map((item: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginVertical: Wp(3),
              }}
            >
              <Text>{`\u2022`}</Text>

              <Text
                style={{
                  flex: 1,
                  paddingLeft: Wp(5),
                }}
              >{`${decodeHTML(item)}`}</Text>
            </View>
          );
        })
      ) : (
        <View>
          <Text
            style={{
              flex: 1,
              paddingLeft: Wp(5),
            }}
          >{`${decodeHTML(stripHTML(data))}`}</Text>
        </View>
      )}
      <View
        style={{
          marginVertical: Wp(10),
        }}
      >
        <Divider accessibilityLabelledBy="" accessibilityLanguage="" />
      </View>
    </View>
  );
}

const ScreenLearnAndGrowDetail = () => {
  const { resources } = useResourcesStore();
  const navigation = useNavigation();
  const ActionSheetRef = React.useRef<BottomSheetRef>(null);

  useEffect(() => {
    setTimeout(() => {
      ActionSheetRef.current?.OpenDetail();
    }, 500);
  }, []); //? For opening Action sheet as soon as the page is loaded , Varun Req

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView style={[globalStyles.bodyWrapper]}>
          <Header pram="back" headerType="New" navigation={navigation} />
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Animatable.View
              animation="slideInDown"
              iterationCount={'infinite'}
              direction="alternate-reverse"
              duration={2500}
              easing={'ease-in-out'}
            >
              <SvgUri
                uri={resources?.icon as string}
                width={wp(100)}
                height={hp(30)}
              />
            </Animatable.View>
          </View>

          <SubDetail
            AuthorName={' '}
            title={resources?.title as string}
            description={(resources?.desc + '...') as string}
            openBottomSheet={() => ActionSheetRef.current?.OpenDetail()}
            authorImg={''}
          />
          <BottomSheet ref={ActionSheetRef}>
            <Detail>
              <View style={globalStyles.topMargin}>
                {/* <Text
                  style={[
                    styles.TitlesStyles,
                    deviceType === "tablet" && styles.TitleStyles_tablet,
                  ]}
                >
                  {resources?.title}
                </Text> */}

                <Heading size="lg">{resources?.title}</Heading>
              </View>
              <View style={globalStyles.topMargin}>
                {/* <Text
                  style={{
                    fontFamily: Nunito(700),
                    fontSize: deviceType === "tablet" ? Wp(13) : Wp(20),
                    color: Colors.primary,
                    marginBottom: deviceType === "tablet" ? Wp(5) : Wp(10),
                  }}
                >
                  Overview
                </Text> */}

                <Heading
                  size="md"
                  style={{
                    marginBottom: IsTablet ? Wp(5) : Wp(10),
                  }}
                >
                  Overview
                </Heading>
                {/* <Text
                  style={{
                    fontFamily: Nunito(400),
                    fontSize: deviceType === "tablet" ? Wp(10) : Wp(14),
                  }}
                >
                  {decodeHTML(stripHTML(resources?.heading as string))}
                </Text> */}

                <AppText>
                  {decodeHTML(stripHTML(resources?.heading as string))}
                </AppText>

                {
                  // ts-ignore
                  ListComp(resources?.causes as string, 'Causes')
                }

                {
                  // ts-ignore
                  ListComp(resources?.symptoms as string, 'Symptoms')
                }
                {
                  // ts-ignore
                  ListComp(resources?.treatment as string, 'Treatment')
                }
              </View>
              <Text
                style={{
                  fontFamily: Fonts.Nunito['700'],
                  fontSize: IsTablet ? Wp(13) : Wp(20),
                  color: Colors.primary,
                  marginBottom: IsTablet ? Wp(5) : Wp(10),
                }}
              >
                Article
              </Text>
              <ArticleCont />
            </Detail>
          </BottomSheet>
        </SafeAreaView>
      </View>
    </>
  );
};

export default ScreenLearnAndGrowDetail;

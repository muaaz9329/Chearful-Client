import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MenuTitle from './menu-title';
import { AppNavigator } from '@app/navigation';
import { MoodDiaryNavigator } from '@app/domains/mood-dairy/navigation';
import ms from '@app/assets/master-styles';
import { images } from '@app/domains/mood-dairy/screens/main-screen/components/mood-card';
import { IsTablet, Wp, capitalizeFirstLetter } from '@app/utils';
import { Heading } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import MoodDiaryServices from '@app/domains/mood-dairy/mood-dairy-services';
import { ActivityIndicator } from 'react-native-paper';

type Props = {};

const MoodDiaryCont = (props: Props) => {
  const Moods = ['happy', 'sad', 'angry', 'peaceful'];
  const [homeData, setData] = useState<{
    data:
      | {
          id: number;
          title: string;
          slug: string;
        }[]
      | null;
    loading: boolean;
    success: boolean;
  }>({
    data: null,
    loading: false,
    success: false,
  });
  const navigation = useNavigation();
  const handlePress = (mood: { id: number; title: string; slug: string }) => {
    //@ts-ignore
    navigation.navigate(AppNavigator.MoodDiary, {
      screen: MoodDiaryNavigator.AddMood,
      params: {
        moodId: mood.id,
        moodSlug: mood.slug,
      },
    });
  };

  useEffect(() => {
    setData({
      data: null,
      loading: true,
      success: false,
    });
    MoodDiaryServices.getMoodsIdAndSlugs({
      onSuccess: ({ ...res }) => {
        setData({
          data: res.mood_diaries,
          loading: false,
          success: true,
        });
      },
      onFailure: (error) => {
        setData({
          data: null,
          loading: false,
          success: false,
        });
      },
    });
  }, []);
  return (
    <View>
      <MenuTitle
        screenPath={{
          module: AppNavigator.MoodDiary,
          screen: MoodDiaryNavigator.Home,
        }}
      >
        Mood Diary
      </MenuTitle>
      <View style={ms(['justifyBetween', 'flexRow', 'mt_10'])}>
        {homeData.loading ? (
          <View
            style={ms([
              'px:12',
              'py_14',

              'br:14',
              'justifyCenter',
              'alignCenter',
              'justifyCenter',
              'flex1',
              'flexRow',
            ])}
          >
            <ActivityIndicator animating={homeData.loading} size={'small'} />
          </View>
        ) : (
          homeData?.data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={ms([
                  'W:80',
                  'py_14',

                  'bg_cont',
                  'br:14',
                  'justifyCenter',
                  'alignCenter',
                  'alignSelfStart',
                ])}
                onPress={() => {
                  handlePress(item);
                }}
              >
                <Image
                  //@ts-ignore
                  source={images[item.title.toLowerCase()]}
                  style={[
                    styles.emojiImageStyles,
                    IsTablet && styles.emojiImageStyles_tablet,
                  ]}
                />
                <Heading size="sm">{capitalizeFirstLetter(item.title)}</Heading>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
};

export default MoodDiaryCont;

const styles = StyleSheet.create({
  emojiImageStyles_tablet: {
    width: Wp(40),
    height: Wp(40),
  },
  emojiImageStyles: {
    width: Wp(50),
    height: Wp(50),
    resizeMode: 'contain',
  },
});

import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuTitle from './components/menu-title';
// import SoundbitesCont from './components/soundbites-cont';
import ArticleCont from './components/article-cont';
import HomeForumCont from './components/forum-cont';
import { NavigationHelpers } from '@react-navigation/native';
import LearnAndGrowCont from './components/learn-grow-cont';
import { IconUserCircle } from 'tabler-icons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThirtyXThirtyModel from './components/thirty-x-thirty';
import useAppState from '@app/hooks/use-app-state';
import ThirtyXThirtyCont from './components/thirty-x-thirty-cont';
import globalStyles from '@app/assets/global-styles';
import ProfileModel from '@app/components/modals/profile-model';
import { ChearfulLogo } from '@app/assets/svgs';
import { Colors } from '@app/constants';
import { Wp } from '@app/utils';
import { AppNavigator } from '@app/navigation/app-navigation';
import { ConsumerContentsNavigator } from '../navigation/consumer-contents-navigation';

const ScreenConsumerContentsHome = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const [visible, setVisible] = React.useState(false);
  const { isUserLoggedIn } = useAppState();

  const handleUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      navigation.navigate(
        AppNavigator.ThirtyXThirty,
        // From here the user will be redirected if he/she is logged in

        // , {
        //   screen: "CHALLENGE-HOME",
        // }
      );
    } else {
      // From here the user will be redirected to login or sign up if he/she is not logged in

      setVisible(true);
    }
  };
  const [thirtyModel, setThirtyModel] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      setVisible(true);
    }
  }, []);
  return (
    <SafeAreaView style={[globalStyles.bodyWrapper]} edges={['top']}>
      <ThirtyXThirtyModel
        visible={thirtyModel}
        setVisible={setThirtyModel}
        navigation={navigation}
      />
      <ProfileModel
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
      />
      <View style={styles.cont}>
        <ChearfulLogo color={Colors.primary} width={110} height={50} />
        <Pressable onPress={handleUser}>
          <IconUserCircle color={Colors.primary} size={Wp(30)} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.flex1}
      >
        <View style={globalStyles.topMargin}>
          <ThirtyXThirtyCont />
        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path={ConsumerContentsNavigator.SoundBites}>
            Soundbites
          </MenuTitle>
          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            {/* <SoundbitesCont /> */}
          </View>
        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path={ConsumerContentsNavigator.Articles}>
            Articles
          </MenuTitle>
          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <ArticleCont />
          </View>
        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path={ConsumerContentsNavigator.LearnAndGrow}>
            Learn & Grow
          </MenuTitle>

          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <LearnAndGrowCont />
          </View>
        </View>

        <View style={globalStyles.topMargin}>
          <MenuTitle path={ConsumerContentsNavigator.Forum}>Forum</MenuTitle>
          <View>
            <HomeForumCont {...{ navigation }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenConsumerContentsHome;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

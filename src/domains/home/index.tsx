import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuTitle from './components/menu-title';
import SoundbitesCont from './components/soundbites-cont';
import ArticleCont from './components/article-cont';
import HomeForumCont from './components/forum-cont';
import { NavigationHelpers } from '@react-navigation/native';
import LearnAndGrowCont from './components/learn-grow-cont';
import { IconUserCircle } from 'tabler-icons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppState from '@app/hooks/use-app-state';
import NewUserCont from './components/new-user-cont';
import globalStyles from '@app/assets/global-styles';
import ProfileModel from '@app/components/modals/profile-model';
import { ChearfulLogo } from '@app/assets/svgs';
import { Colors } from '@app/constants';
import { Wp } from '@app/utils';
import { ConsumerContentsNavigator } from '../consumer-contents/navigation/consumer-contents-navigation';
import { challengeStorageKeys } from '@app/domains/events/thirty-x-thirty/constants';
import LoggedInFeaturesCont from './components/logged-in-features-cont';

// function isFeatureAvailable() {
//   const currentDate = new Date();
//   const startDate = new Date('2023-10-28');
//   const endDate = new Date('2023-11-26');
//   return currentDate >= startDate && currentDate <= endDate;
// }

const ScreenConsumerContentsHome = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const [visible, setVisible] = React.useState(false);
  const { isUserLoggedIn } = useAppState();
  const { updateAppState } = useAppState();

  const handleUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
           
            updateAppState({ isUserLoggedIn: false });
          },
          style: 'destructive',
        },
      ]);
    } else {
      // From here the user will be redirected to login or sign up if he/she is not logged in
      setVisible(true);
    }
  };

  return (
    <SafeAreaView
      style={[globalStyles.bodyWrapper]}
      edges={['top', 'right', 'left']}
    >
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
       
        {!isUserLoggedIn ? (
          <View style={globalStyles.topMargin}>
            <NewUserCont navigation={navigation} />
          </View>
        ):(
          
          <LoggedInFeaturesCont/>
        )}
      
        <View style={globalStyles.topMargin}>
          <MenuTitle path={ConsumerContentsNavigator.SoundBites}>
            Soundbites
          </MenuTitle>
          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <SoundbitesCont />
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

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors } from '@app/constants/';
import { Hp, IsTablet, hp, wp } from '@app/utils';
import { ForumNavigation } from '@app/domains/consumer-contents/domains/forum';
import AuthNavigation from '@app/domains/authentication/navigation';
import ThirtyXThirtyNavigation from '@app/domains/events/thirty-x-thirty/navigation/thirty-x-thirty-navigation-stack';
import ConsumerContentsNavigation from '@app/domains/consumer-contents/navigation/consumer-contents-navigation';
import ScreenConsumerContentsHome from '@app/domains/consumer-contents/domains/home';
import ScreenScheduleSession from '@app/domains/standalones/screens';
import { WebLinkTabButton } from './components';
import { Platform } from 'react-native';
import Calender from '@app/domains/mood-dairy/components/weekly-calender';
import MoodSelection from '@app/domains/mood-dairy/components/mood-selection';
import MoodCard from '@app/domains/mood-dairy/components/mood-card';
import MoodSlider from '@app/domains/mood-dairy/components/mood-slider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const enum AppNavigator {
  'HomeTabs' = 'HomeTabs',
  'Auth' = 'Auth',
  'ThirtyXThirty' = 'ThirtyXThirty',
  'ConsumerContents' = 'ConsumerContents',
}

export const enum HomeTabsNavigator {
  'Home' = 'Home',
  'AskQuestion' = 'AskQuestion',
  'ScheduleSession' = 'ScheduleSession',
  'Profile' = 'Profile',
}

/*
  ---------------- Navigators Here ----------------
  From Bottom To Top.
  Planning to make the whole app's navigation here.
 */

/**
 * Root Tab Navigator
 */
const RootTabNavigation = () => {
  const webLinks = {
    // AskQuestion: 'https://chearful.com/community',
    // ScheduleSession: 'https://chearful.com/meet-practitioners',
    Profile: 'https://chearful.com/client-signup',
  };

  const getTabBarIcon = (route: any, focused: boolean, color: string) => {
    let iconName;
    let Icon = IonIcon;

    if (route.name === 'Home') {
      Icon = MaterialIcon;
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'AskQuestion') {
      Icon = MaterialIcon;
      iconName = focused ? 'help-circle' : 'help-circle-outline';
    } else if (route.name === 'ScheduleSession') {
      Icon = IonIcon;
      iconName = focused ? 'videocam' : 'videocam-outline';
    } else if (route.name === 'Profile') {
      Icon = IonIcon;
      iconName = focused ? 'person' : 'person-outline';
    }

    if (Object.keys(webLinks).includes(route.name)) {
      return (
        <WebLinkTabButton
          url={webLinks[route.name as keyof typeof webLinks]}
          iconName={iconName as string}
          icon={Icon}
          color={color}
        />
      );
    }

    // Return the custom icon component
    return <Icon name={iconName as string} size={30} color={color} />;
  };

  return (
    <Tab.Navigator
      initialRouteName={HomeTabsNavigator.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) =>
          getTabBarIcon(route, focused, color),
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Hp(8),
          height: IsTablet
            ? hp(6)
            : Platform.OS === 'android'
            ? wp(15)
            : hp(11),
        },
        tabBarActiveTintColor: Colors.primary,
      })}
    >
      <Tab.Screen
        name={HomeTabsNavigator.Home}
        options={{
          tabBarLabel: 'Home',
        }}
        component={ScreenConsumerContentsHome}
      />
      <Tab.Screen
        name={HomeTabsNavigator.ScheduleSession}
        options={{
          tabBarLabel: 'Schedule a Session',
        }}
        component={ScreenScheduleSession}
      />
      <Tab.Screen
        name={HomeTabsNavigator.AskQuestion}
        options={{
          tabBarLabel: 'Ask a Question',
        }}
        component={ForumNavigation}
      />
    </Tab.Navigator>
  );
};

/**
 * App Navigator Wrapper Component
 */
export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={AppNavigator.HomeTabs}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AppNavigator.HomeTabs}
        component={RootTabNavigation}
      />

      <Stack.Screen name={AppNavigator.Auth} component={AuthNavigation} />

      <Stack.Screen
        name={AppNavigator.ThirtyXThirty}
        component={ThirtyXThirtyNavigation}
      />

      <Stack.Screen
        name={AppNavigator.ConsumerContents}
        component={ConsumerContentsNavigation}
      />
    </Stack.Navigator>

  
   
  
  );
}

import * as React from 'react';
import { Linking, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Colors } from '@app/constants/';
import { Hp, IsTablet, hp } from '@app/utils';
import { ForumNavigation } from '@app/domains/forum';
import AuthNavigation from '@app/domains/authentication/navigation';
import ThirtyXThirtyNavigation from '@app/domains/events/thirty-x-thirty/navigation/thirty-x-thirty-navigation-stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Test = () => (
  <SafeAreaView>
    <Text>Screen Text</Text>
  </SafeAreaView>
);

/**
 * A touchable button that opens the given url in browser.
 * @description Used in bottom tab
 */
const WebLinkTabButton = ({
  url,
  icon,
  color,
}: {
  url: string;
  icon: string;
  color: string;
}) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <IonIcon name={icon} size={30} color={color} />
  </TouchableOpacity>
);

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
    ScheduleSession: 'https://chearful.com/meet-practitioners',
    Profile: 'https://chearful.com/client-signup',
  };

  const getTabBarIcon = (route: any, focused: boolean, color: string) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'AskQuestion') {
      iconName = focused ? 'help-circle' : 'help-circle-outline';
    } else if (route.name === 'ScheduleSession') {
      iconName = focused ? 'videocam' : 'videocam-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    }

    if (Object.keys(webLinks).includes(route.name)) {
      return (
        <WebLinkTabButton
          url={webLinks[route.name as keyof typeof webLinks]}
          icon={iconName as string}
          color={color}
        />
      );
    }

    // Return the custom icon component
    return <MaterialIcon name={iconName as string} size={30} color={color} />;
  };

  return (
    <Tab.Navigator
      initialRouteName={RootTabNavigator.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) =>
          getTabBarIcon(route, focused, color),
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Hp(8),
          height: IsTablet ? hp(6) : hp(11),
        },
        tabBarActiveTintColor: Colors.primary,
      })}
    >
      <Tab.Screen
        name={RootTabNavigator.Home}
        options={{
          tabBarLabel: 'Home',
        }}
        component={Test}
      />
      <Tab.Screen
        name={RootTabNavigator.ScheduleSession}
        options={{
          tabBarLabel: 'Schedule a Session',
        }}
        component={Test}
      />
      <Tab.Screen
        name={RootTabNavigator.AskQuestion}
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
    </Stack.Navigator>
  );
}

export const enum AppNavigator {
  'HomeTabs' = 'HomeTabs',
  'Auth' = 'Auth',
}

export const enum RootTabNavigator {
  'Home' = 'Home',
  'AskQuestion' = 'AskQuestion',
  'ScheduleSession' = 'ScheduleSession',
  'Profile' = 'Profile',
}

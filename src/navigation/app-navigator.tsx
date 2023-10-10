import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking, Text, View } from 'react-native';

import { Colors } from '@src/constants/';
import { Hp, IsTablet, hp } from '@src/utils';

const Tab = createBottomTabNavigator();

const webLinks = {
  'Ask-A-Question': 'https://chearful.com/community',
  'Schedule-A-Session': 'https://chearful.com/meet-practitioners',
  Profile: 'https://chearful.com/client-signup',
};

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

const getTabBarIcon = (route: any, focused: boolean, color: string) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Ask-A-Question') {
    iconName = focused ? 'help-circle' : 'help-circle-outline';
  } else if (route.name === 'Schedule a Session') {
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

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
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
        name="Home"
        options={{
          tabBarLabel: 'Home',
        }}
        component={() => (
          <View>
            <Text>Home</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="Schedule-A-Session"
        options={{
          tabBarLabel: 'Schedule a Session',
        }}
        component={() => (
          <View>
            <Text>Schedule-A-Session</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="Ask-A-Question"
        options={{
          tabBarLabel: 'Ask a Question',
        }}
        component={() => (
          <View>
            <Text>Ask-A-Question</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;

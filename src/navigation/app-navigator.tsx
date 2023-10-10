import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }

// function ProfileStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
//   }

// function AppDrawer() {
//   return (
//     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen name="Home" component={AppTabs} />
//       <Drawer.Screen name="Profile" component={ProfileStack} />
//       <Drawer.Screen name="Settings" component={SettingsStack} />
//     </Drawer.Navigator>
//   );
// }

function AppNavigator() {
  useEffect(() => {
    Toast.show({
      text1: 'Hello',
      text2: 'This is some something 👋',
      type: 'SuccessToast',
      onHide: () =>
        Toast.show({
          type: 'WarningToast',
          text1: 'warning toast',
        }),
    });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={() => (
          <View>
            <Text>Home</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;

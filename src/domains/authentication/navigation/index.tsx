import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenLogin from '../login/screens/screen-login';
import ScreenSignup from '../signup/screens/screen-signup';

export const enum AuthNavigator {
  'Login' = 'Login',
  'SignUp' = 'SignUp',
}

export default function AuthNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AuthNavigator.Login}
    >
      <Stack.Screen name={AuthNavigator.Login} component={ScreenLogin} />
      <Stack.Screen name={AuthNavigator.SignUp} component={ScreenSignup} />
    </Stack.Navigator>
  );
}

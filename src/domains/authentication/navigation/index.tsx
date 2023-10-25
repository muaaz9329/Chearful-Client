import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login-done/screens/screen-login';
// import SignUp from '../signup/screens/SIGNUP-SCREEN';

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
      <Stack.Screen name={AuthNavigator.Login} component={Login} />
      {/* <Stack.Screen name={AuthNavigator.SignUp} component={SignUp} /> */}
    </Stack.Navigator>
  );
}

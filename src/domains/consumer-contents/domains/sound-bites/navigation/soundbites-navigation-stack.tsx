import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SoundBitesDetail from '../screens/soundbite-detail';
import SoundBitesListing from '../screens/screen-soundbite-listing';

export const enum SoundbitesNavigator {
  'SoundBitesListing' = 'SoundBitesListing',
  'SoundBitesDetail' = 'SoundBitesDetail',
}

const ContentSoundbitesNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={SoundbitesNavigator.SoundBitesListing}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SoundbitesNavigator.SoundBitesListing}
        component={SoundBitesListing}
      />
      <Stack.Screen
        name={SoundbitesNavigator.SoundBitesDetail}
        component={SoundBitesDetail}
      />
    </Stack.Navigator>
  );
};

export default ContentSoundbitesNavigation;

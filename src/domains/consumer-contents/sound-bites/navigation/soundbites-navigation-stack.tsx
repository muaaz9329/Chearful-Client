
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SoundBitesDetail from '../soundbite-detail/soundBites-detail';
import SoundBitesListing from '../soundbite-listing/soundbite-listing';


const SoundbitesNavigationStack = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName='sound-bites-listing'
    screenOptions={{
        headerShown: false
        }}
    >
        <Stack.Screen name="sound-bites-listing" component={SoundBitesListing} />
        <Stack.Screen name="sound-bites-detail" component={SoundBitesDetail} />
    </Stack.Navigator>
  )
}

export default SoundbitesNavigationStack
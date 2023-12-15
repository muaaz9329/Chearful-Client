import { createStackNavigator } from '@react-navigation/stack';

import Listing from '../screens/listing/listing';
import Detail from '../screens/detail/detail';

export const enum MeetAPractitionerNavigator {
  Listing = 'listing',
  Detail = 'detail',
}

export function MeetAPractitionerNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName='listing'
    
    >
      <Stack.Screen
        name={MeetAPractitionerNavigator.Listing}
        component={Listing}
      />
      <Stack.Screen name={MeetAPractitionerNavigator.Detail} component={Detail} />
    </Stack.Navigator>
  );
}

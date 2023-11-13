import { createStackNavigator } from '@react-navigation/stack';
import {
  // ScreenChooseJournal,
  ScreenJournalHome,
  // ScreenJournalPlaceholder,
} from '../screens';

export const enum JournalNavigator {
  'Placeholder' = 'Placeholder',
  'Home' = 'Home',
}

export default function JournalNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name={JournalNavigator.Placeholder}
        component={ScreenJournalPlaceholder}
      /> */}
      <Stack.Screen
        name={JournalNavigator.Home}
        component={ScreenJournalHome}
      />

      {/* <Stack.Screen
        name={JournalNavigator.Home}
        component={ScreenChooseJournal}
      /> */}
    </Stack.Navigator>
  );
}

import { createStackNavigator } from '@react-navigation/stack';
import { ScreenAddMood, ScreenMoodHome, ScreenViewMood } from '../screens';

export const enum MoodDiaryNavigator {
  'Home' = 'Home',
  'AddMood' = 'AddMood',
  'ViewMood' = 'ViewMood',
}

export default function MoodDiaryNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={MoodDiaryNavigator.Home} component={ScreenMoodHome} />
      <Stack.Screen
        name={MoodDiaryNavigator.AddMood}
        component={ScreenAddMood}
      />
      <Stack.Screen
        name={MoodDiaryNavigator.ViewMood}
        component={ScreenViewMood}
      />
    </Stack.Navigator>
  );
}

import { createStackNavigator } from '@react-navigation/stack';

export const enum JournalNavigator {
  'Placeholder' = 'Placeholder',
}

export default function JournalNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={JournalNavigator.Placeholder}
        component={() => null}
      />
    </Stack.Navigator>
  );
}

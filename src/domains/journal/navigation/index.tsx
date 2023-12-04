import { createStackNavigator } from '@react-navigation/stack';
import {
  ScreenChooseJournal,
  ScreenOwnJournalHome,
  ScreenAssignedJournalHome,
  ScreenJournalPlaceholder,
  ScreenAddJournalEntry,
  ScreenJournalEntryDetailed,
} from '../screens';

export const enum JournalNavigator {
  'Placeholder' = 'Placeholder',
  'OwnJournalHome' = 'OwnJournalHome',
  'AssignedJournalHome' = 'AssignedJournalHome',
  'ChooseJournal' = 'ChooseJournal',
  'AddEntry' = 'AddEntry',
  'EntryDetailed' = 'EntryDetailed',
}

export default function JournalNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={JournalNavigator.Placeholder}
        component={ScreenJournalPlaceholder}
      />
      <Stack.Screen
        name={JournalNavigator.OwnJournalHome}
        component={ScreenOwnJournalHome}
      />
      <Stack.Screen
        name={JournalNavigator.AssignedJournalHome}
        component={ScreenAssignedJournalHome}
      />

      <Stack.Screen
        name={JournalNavigator.ChooseJournal}
        component={ScreenChooseJournal}
      />

      <Stack.Screen
        name={JournalNavigator.AddEntry}
        component={ScreenAddJournalEntry}
      />

      <Stack.Screen
        name={JournalNavigator.EntryDetailed}
        component={ScreenJournalEntryDetailed}
      />
    </Stack.Navigator>
  );
}

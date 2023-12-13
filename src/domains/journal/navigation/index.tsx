import { createStackNavigator } from '@react-navigation/stack';
import {
  ScreenChooseJournal,
  ScreenOwnJournalHome,
  ScreenAssignedJournalHome,
  ScreenJournalPlaceholder,
  ScreenAddJournalEntry,
  ScreenJournalEntryDetailed,
} from '../screens';
import ScreenFrequencyEntries from '../screens/frequency-entries';

export const enum JournalNavigator {
  'Placeholder' = 'Placeholder',
  'OwnJournalHome' = 'OwnJournalHome',
  'AssignedJournalHome' = 'AssignedJournalHome',
  'ChooseJournal' = 'ChooseJournal',
  'AddEntry' = 'AddEntry',
  'EntryDetailed' = 'EntryDetailed',
  'FrequencyEntries' = 'FrequencyEntries',
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
        name={JournalNavigator.FrequencyEntries}
        component={ScreenFrequencyEntries}
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

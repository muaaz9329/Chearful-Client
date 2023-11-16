import { AppText, Header, Heading } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import ms from '@app/assets/master-styles';
import { NavigationHelpers } from '@react-navigation/native';
import { journalEntries } from '../data/journal-data';
import { moderateScale } from 'react-native-size-matters';
import { View } from 'react-native';

export default function ScreenJournalEntryDetailed({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const entryId = route.params.entryId;

  const entry = journalEntries.find((e) => e.id === entryId);

  return (
    <SafeAreaView style={ms(['Wrapper'])}>
      <Header headerType="New" pram="back">
        <View>
          <Heading size="lg">{entry?.type.title} Journal</Heading>
          <AppText>{entry?.time.title} Entry</AppText>
        </View>
      </Header>

      <View></View>
    </SafeAreaView>
  );
}

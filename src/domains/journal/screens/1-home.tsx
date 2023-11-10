import globalStyles from '@app/assets/global-styles';
import { CategoryFilter, Header, Heading, SearchInput } from '@app/components';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalTypes } from '../data/journal-data';

export default function ScreenJournalHome() {
  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header headerType="New" pram="back">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Heading size="lg">Journal Entries</Heading>
          {/* <IconPlus size={30} color="#000" /> */}
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <SearchInput placeholder="Search" />
      </View>

      <View style={globalStyles.mt_15}>
        <CategoryFilter tags={journalTypes} />
      </View>
    </SafeAreaView>
  );
}

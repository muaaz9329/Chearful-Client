import globalStyles from '@app/assets/global-styles';
import {
  CategoryFilter,
  Header,
  Heading,
  SearchInput,
  XGap,
  YGap,
} from '@app/components';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalEntries, journalTypes } from '../data/journal-data';
import { hp } from '@app/utils';
import JournalEntryCard from '../components/journal-entry-card';

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

      <View
        style={[
          globalStyles.mt_15,
          {
            // flex: 1,
            paddingBottom: hp(2),
          },
        ]}
      >
        <FlatList
          data={journalEntries}
          renderItem={({ item }) => <JournalEntryCard entry={item} />}
          showsVerticalScrollIndicator={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={XGap}
        />
      </View>
    </SafeAreaView>
  );
}

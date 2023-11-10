import globalStyles from '@app/assets/global-styles';
import {
  CategoryFilter,
  Header,
  Heading,
  SearchInput,
  YGap,
} from '@app/components';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalTypes } from '../data/journal-data';
import JournalTypeCard from '../components/journal-type-card';
import { IsTablet } from '@app/utils';

export default function ScreenChooseJournal() {
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
          <Heading size="lg">Choose Journal</Heading>
          {/* <IconPlus size={30} color="#000" /> */}
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <SearchInput placeholder="Search" />
      </View>

      <View style={globalStyles.mt_15}>
        <FlatList
          data={journalTypes}
          renderItem={({ item }) => (
            <JournalTypeCard
              title={item.title}
              description={item.description}
            />
          )}
          contentContainerStyle={
            IsTablet
              ? {
                  alignItems: 'center',
                }
              : {}
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={YGap}
        />
      </View>
    </SafeAreaView>
  );
}

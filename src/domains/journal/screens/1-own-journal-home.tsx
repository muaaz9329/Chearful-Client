import globalStyles from '@app/assets/global-styles';
import {
  AppText,
  CategoryFilter,
  Header,
  Heading,
  SearchInput,
  XGap,
} from '@app/components';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalEntries, journalTypes } from '../data/journal-data';
import { hp } from '@app/utils';
import JournalEntryCard from '../components/journal-entry-card';
import { ms } from 'react-native-size-matters';
import { useState } from 'react';
import { IconPlus } from 'tabler-icons-react-native';
import JournalActionsSheet from '../components/journal-actions-sheet';
import { NavigationHelpers } from '@react-navigation/native';
import { JournalNavigator } from '../navigation';
import { RequestState } from '@app/services/api-service';
import { ownJournalService } from '../journal-service';

export default function ScreenOwnJournalHome({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const { journalId } = route.params;
  const [sheetShown, setSheetShown] = useState(false);

  const [journalEntries, setJournalEntries] = useState<{
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<typeof ownJournalService.getJournalEntries>[0]['onSuccess']
      >[0]['data']
    >;
  }>({
    data: {},
    state: 'loading',
  });

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
          <Pressable onPress={() => setSheetShown((prev) => !prev)}>
            <IconPlus size={30} color="#000" />
          </Pressable>
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <SearchInput placeholder="Search" />
      </View>

      <View style={globalStyles.mt_15}>
        <CategoryFilter tags={journalTypes} />
      </View>

      <ScrollView
        style={[
          globalStyles.mt_15,
          {
            paddingBottom: hp(2),
          },
        ]}
      >
        {journalTypes.map((type) => (
          <View key={type.id} style={{ rowGap: ms(10), marginBottom: ms(20) }}>
            <AppText>{type.title}</AppText>
            {journalEntries
              .filter((entry) => entry.type.id === type.id)
              .slice(0, 3).length === 0 ? (
              <AppText>No entries yet</AppText>
            ) : (
              <FlatList
                data={journalEntries
                  .filter((entry) => entry.type.id === type.id)
                  .slice(0, 3)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <JournalEntryCard
                    entry={item}
                    onPress={() => {
                      navigation.navigate(JournalNavigator.EntryDetailed, {
                        entryId: item.id,
                      });
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={XGap}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {sheetShown && (
        <JournalActionsSheet
          navigation={navigation}
          onClose={() => {
            setSheetShown(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

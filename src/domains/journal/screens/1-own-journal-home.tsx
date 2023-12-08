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
import { hp } from '@app/utils';
import JournalEntryCard from '../components/journal-entry-card';
import { ms } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { IconPlus } from 'tabler-icons-react-native';
import JournalActionsSheet from '../components/journal-actions-sheet';
import { NavigationHelpers } from '@react-navigation/native';
import { JournalNavigator } from '../navigation';
import { RequestState } from '@app/services/api-service';
import { ownJournalService } from '../journal-service';
import useJournalStore from '../use-journal-store';

export default function ScreenOwnJournalHome({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const [sheetShown, setSheetShown] = useState(false);
  const [journalId, setJournalId] = useState<number>(route.params?.journalId);

  const { ownJournals } = useJournalStore();

  const [page, setPage] = useState(1);
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

  useEffect(() => {
    ownJournalService.getJournalEntries({
      journalId,
      onSuccess: ({ data }) => {
        setJournalEntries({
          state: 'loaded',
          data,
        });
      },
      onFailure: () => {
        setJournalEntries({
          state: 'erred',
          data: {},
        });
      },
    });
  }, [journalId]);

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
          <Pressable
            onPress={() => {
              // setSheetShown((prev) => !prev)
              navigation.navigate(JournalNavigator.AddEntry, {
                journalType: {
                  id: journalId,
                  title: ownJournals.data?.journals?.find(
                    (journal) => journal.id === journalId,
                  )?.title,
                },
                kind: 'own',
              });
            }}
          >
            <IconPlus size={30} color="#000" />
          </Pressable>
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <CategoryFilter
          tags={ownJournals.data.journals}
          onChangeTag={({ id }) => setJournalId(id)}
        />
      </View>

      <ScrollView
        style={[
          globalStyles.mt_18,
          {
            paddingBottom: hp(2),
          },
        ]}
      >
        {
          {
            idle: <AppText>Idle</AppText>,
            loading: <AppText>Loading...</AppText>,
            erred: <AppText>Something went wrong</AppText>,
            loaded: Object.entries(
              journalEntries.data.journalEntries || {},
            ).map(([date, entries]) => (
              <View
                style={{
                  rowGap: ms(10),
                  marginBottom: ms(20),
                }}
              >
                <AppText>
                  {new Date(entries?.[0]?.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }) || date}
                </AppText>

                <FlatList
                  data={entries}
                  renderItem={({ item }) => (
                    <JournalEntryCard
                      key={item.id}
                      entry={item}
                      kind="own"
                      onPress={() => {
                        navigation.navigate(JournalNavigator.EntryDetailed, {
                          entryId: item.id,
                          journalTitle: item.title,
                          kind: 'own',
                        });
                      }}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <XGap />}
                />
              </View>
            )),
          }[journalEntries.state]
        }
      </ScrollView>

      {/* {sheetShown && (
        <JournalActionsSheet
          navigation={navigation}
          onClose={() => {
            setSheetShown(false);
          }}
        />
      )} */}
    </SafeAreaView>
  );
}

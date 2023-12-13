import globalStyles from '@app/assets/global-styles';
import { AppText, Header, Heading, Loader, XGap } from '@app/components';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDate, hp } from '@app/utils';
import JournalEntryCard from '../components/journal-entry-card';
import { ms } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { IconPlus } from 'tabler-icons-react-native';
import { NavigationHelpers } from '@react-navigation/native';
import { JournalNavigator } from '../navigation';
import { RequestState } from '@app/services/api-service';
import { assignedJournalService } from '../journal-service';

export default function ScreenFrequencyEntries({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const { journalType, frequency } = route.params;

  const [page, setPage] = useState(1);
  const [journalEntries, setJournalEntries] = useState<{
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<
          typeof assignedJournalService.getJournalEntries
        >[0]['onSuccess']
      >[0]['data']
    >;
  }>({
    data: {},
    state: 'loading',
  });

  useEffect(() => {
    assignedJournalService.getJournalEntries({
      frequencyId: frequency.id,
      page,
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
  }, [frequency.id]);

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
          <View>
            <Heading size="lg">{journalType.title} Journal</Heading>
            <AppText>
              {frequency?.journal_time?.toUpperCase() + ' Entries'}{' '}
            </AppText>
          </View>
          {/* <Pressable
            onPress={() => {
              navigation.navigate(JournalNavigator.AddEntry, {
                journalType,
                frequency,

                kind: 'assigned',
              });
            }}
          >
            <IconPlus size={30} color="#000" />
          </Pressable> */}
        </View>
      </Header>

      {/* <View style={globalStyles.mt_15}>
        <CategoryFilter
          selectedId={journalId}
          tags={ownJournals.data.journals}
          onChangeTag={({ id }) => setJournalId(id)}
        />
      </View> */}

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
            loading: <Loader />,
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
                <AppText>{formatDate(entries?.[0]?.date) || date}</AppText>

                <FlatList
                  data={entries}
                  renderItem={({ item }) => (
                    <JournalEntryCard
                      key={item.id}
                      entry={item}
                      kind="own"
                      onPress={() => {
                        item.journal_status === 'pending'
                          ? navigation.navigate(JournalNavigator.AddEntry, {
                              journalType,
                              frequency,
                              entry: item,
                              kind: 'assigned',
                            })
                          : navigation.navigate(
                              JournalNavigator.EntryDetailed,
                              {
                                entryId: item.id,
                                journalTitle: item.title,
                                kind: 'assigned',
                              },
                            );
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

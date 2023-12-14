import globalStyles from '@app/assets/global-styles';
import {
  AppText,
  Header,
  Heading,
  ListNextBatchFooter,
  Loader,
  XGap,
} from '@app/components';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { capitalizeFirstLetter, formatDate, hp } from '@app/utils';
import JournalEntryCard from '../components/journal-entry-card';
import { moderateScale, ms } from 'react-native-size-matters';
import { useCallback, useState } from 'react';
import { NavigationHelpers, useFocusEffect } from '@react-navigation/native';
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

  useFocusEffect(
    useCallback(() => {
      assignedJournalService.getJournalEntries({
        frequencyId: frequency.id,
        page,
        onSuccess: ({ data }) => {
          setJournalEntries({
            state: 'loaded',
            data: {
              ...journalEntries.data,
              ...data,
              journalEntries: {
                ...journalEntries.data.journalEntries,
                ...data.journalEntries,
              },
            },
          });
        },
        onFailure: () => {
          setJournalEntries({
            state: 'erred',
            data: {},
          });
        },
      });
    }, [frequency.id, page]),
  );

  console.log('journalEntries.data.journalEntries', journalEntries.data);

  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header headerType="New" pram="back">
        <View>
          <Heading size="lg">{journalType.title} Journal</Heading>
          <AppText>
            {capitalizeFirstLetter(frequency?.journal_time || '') + ' Entries'}{' '}
          </AppText>
        </View>
      </Header>

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
            loading: <Loader style={{ marginVertical: moderateScale(20) }} />,
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
                      kind="assigned"
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

        <ListNextBatchFooter
          status={journalEntries.state}
          currentPage={page}
          totalPages={journalEntries.data.total_pages}
          onLoadNextBatch={() => {
            setPage((prev) => prev + 1);
          }}
        />
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

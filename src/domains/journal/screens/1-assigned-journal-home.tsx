import globalStyles from '@app/assets/global-styles';
import {
  AppText,
  BaseCard,
  CategoryFilter,
  Header,
  Heading,
  ListNextBatchFooter,
  Loader,
  XGap,
} from '@app/components';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { NavigationHelpers, useFocusEffect } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, ms } from 'react-native-size-matters';

import { capitalizeFirstLetter, formatDate, hp } from '@app/utils';
import { JournalNavigator } from '../navigation';
import { RequestState } from '@app/services/api-service';
import { assignedJournalService } from '../journal-service';
import useJournalStore from '../use-journal-store';

export default function ScreenAssignedJournalHome({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const [journalId, setJournalId] = useState<number>(route.params?.journalId);

  const { assignedJournals } = useJournalStore();

  const [page, setPage] = useState(1);

  const [datesList, setDatesList] = useState<{
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<typeof assignedJournalService.getDatesList>[0]['onSuccess']
      >[0]['data']
    >;
  }>({
    data: {},
    state: 'loading',
  });

  useFocusEffect(
    useCallback(() => {
      assignedJournalService.getDatesList({
        journalId,
        page,
        onSuccess: ({ data }) => {
          setDatesList({
            state: 'loaded',
            data: {
              ...datesList.data,
              ...data,
              journals: [
                ...(datesList.data.journals || []),
                ...(data.journals || []),
              ],
            },
          });
        },
        onFailure: () => {
          setDatesList({
            state: 'erred',
            data: {},
          });
        },
      });
    }, [journalId, page]),
  );

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
          <Heading size="lg">Assigned Journals</Heading>
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <CategoryFilter
          selectedId={journalId}
          tags={assignedJournals.data.journals}
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
            loading: <Loader style={{ marginVertical: moderateScale(20) }} />,
            erred: <AppText>Something went wrong</AppText>,
            loaded: datesList.data.journals?.map((item) => {
              return (
                <View
                  style={{
                    marginBottom: ms(30),
                  }}
                >
                  <Heading
                    size="sm"
                    style={{
                      marginBottom: ms(10),
                    }}
                  >
                    {formatDate(item.start_date)} - {formatDate(item.end_date)}
                  </Heading>
                  <Animated.View entering={FadeInDown.springify()}>
                    <FlatList
                      data={item.frequencies}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(
                              JournalNavigator.FrequencyEntries,
                              {
                                journalType: {
                                  id: journalId,
                                  title: assignedJournals.data?.journals?.find(
                                    (journal) => journal.id === journalId,
                                  )?.title,
                                },
                                frequency: item,
                              },
                            )
                          }
                        >
                          <BaseCard style={{ minHeight: 'auto' }}>
                            <AppText>
                              {capitalizeFirstLetter(item.journal_time || '')}
                            </AppText>
                          </BaseCard>
                        </TouchableOpacity>
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <XGap />}
                    />
                  </Animated.View>
                </View>
              );
            }),
          }[datesList.state]
        }

        <ListNextBatchFooter
          status={datesList.state}
          currentPage={page}
          totalPages={datesList.data.total_pages}
          onLoadNextBatch={() => {
            setPage((prev) => prev + 1);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

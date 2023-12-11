import { AppText, Header, Heading, Loader } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { NavigationHelpers } from '@react-navigation/native';

import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { journalEntries } from '../data/journal-data';
import { Wp, hp } from '@app/utils';
import { AppImages } from '@app/assets/images';
import { Colors } from '@app/constants';
import { useEffect, useRef, useState } from 'react';
import JournalEntryAnswer from '../components/journal-entry-answer';
import { RequestState } from '@app/services/api-service';
import { ownJournalService } from '../journal-service';
import { ScrollView } from 'react-native';

export default function ScreenJournalEntryDetailed({
  route,
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const sheetRef = useRef<ActionSheetRef | null>(null);
  const { entryId, journalTitle, kind } = route.params;

  const [entryDetails, setEntryDetails] = useState<{
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<typeof ownJournalService.getEntryDetails>[0]['onSuccess']
      >[0]['data']
    >;
  }>({
    state: 'loading',
    data: {},
  });

  useEffect(() => {
    setTimeout(() => {
      sheetRef.current?.show();
    }, 50);

    ownJournalService.getEntryDetails({
      entryId,
      onSuccess: ({ data }) => {
        setEntryDetails({
          state: 'loaded',
          data,
        });
      },
      onFailure: () => {
        setEntryDetails({
          state: 'erred',
          data: {},
        });
      },
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          paddingTop: Wp(16),
          paddingHorizontal: Wp(20),
        }}
      >
        <Header headerType="New" pram="back" navigation={navigation}>
          <View>
            <Heading size="lg">{journalTitle} Journal</Heading>
            {/* {kind === 'own' ? (
              <AppText>
                {new Date(entryDetails?.data?.date || '').toLocaleDateString(
                  'en-US',
                  {
                    timeStyle: 'short',
                  },
                )}
              </AppText>
            ) : (
              <AppText>{entryDetails?.data?.attempted_time + ' Entry'}</AppText>
            )} */}
            {/* <AppText>{entry?.time.title} Entry</AppText> */}
          </View>
        </Header>

        <View
          style={{
            height: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {entryDetails.data.pdf_url && (
            <Image
              source={{ uri: entryDetails.data.pdf_url }}
              style={{
                width: moderateScale(80),
                height: moderateScale(80),
                borderRadius: 50,
                marginBottom: moderateScale(8),
              }}
            />
          )}

          <Heading
            size="sm"
            style={{
              marginBottom: moderateScale(1),
            }}
          >
            {kind === 'own' ? 'Self Assigned' : `Assigned by ${'Dr. '}`}
          </Heading>
          <AppText>
            {new Date(
              entryDetails.data.attempted_time || '',
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </AppText>
        </View>
      </View>
      <ScrollView
        style={{
          rowGap: ms(25),
          paddingTop: ms(15),
          paddingHorizontal: ms(20),
          paddingBottom: ms(2),
          backgroundColor: Colors.orangeDim,
        }}
      >
        {entryDetails.state === 'loading' ? (
          <Loader />
        ) : entryDetails.state === 'erred' ? (
          <AppText>Something went wrong</AppText>
        ) : (
          <>
            {entryDetails.data?.question_answers?.[0]?.arrQuestions.map(
              (question) => {
                const questionTxt = question.question_title;

                return (
                  <JournalEntryAnswer
                    type={question.question_type}
                    question={questionTxt}
                    answers={question.answers}
                    key={question.id}
                  />
                );
              },
            )}
          </>
        )}
      </ScrollView>

      {/* <ActionSheet
        ref={sheetRef}
        defaultOverlayOpacity={0}
        snapPoints={[60, 30]}
        closable={false}
        gestureEnabled={true}
        CustomHeaderComponent={<View />}
      >
      </ActionSheet> */}
    </SafeAreaView>
  );
}

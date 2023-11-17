import { AppText, Header, Heading } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { NavigationHelpers } from '@react-navigation/native';

import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { journalEntries } from '../data/journal-data';
import { Wp, hp } from '@app/utils';
import { AppImages } from '@app/assets/images';
import { Colors } from '@app/constants';
import { useEffect, useRef } from 'react';
import JournalEntryAnswer from '../components/journal-entry-answer';

export default function ScreenJournalEntryDetailed({
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const sheetRef = useRef<ActionSheetRef | null>(null);

  const entryId = route.params.entryId;
  const entry = journalEntries.find((e) => e.id === entryId);

  useEffect(() => {
    setTimeout(() => {
      sheetRef.current?.show();
    }, 50);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          paddingTop: Wp(16),
          paddingHorizontal: Wp(20),
        }}
      >
        <Header headerType="New" pram="back">
          <View>
            <Heading size="lg">{entry?.type.title} Journal</Heading>
            <AppText>{entry?.time.title} Entry</AppText>
          </View>
        </Header>

        <View
          style={{
            height: hp(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              source={AppImages.user01}
              style={{
                width: moderateScale(80),
                height: moderateScale(80),
                borderRadius: 50,
                marginBottom: moderateScale(8),
              }}
            />
            <Heading
              size="sm"
              style={{
                marginBottom: moderateScale(1),
              }}
            >
              Assigned by {'Dr. ' + entry?.assignedBy?.title}
            </Heading>
            <AppText>
              {new Date(entry?.date || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </AppText>
          </View>
        </View>
      </View>

      <ActionSheet
        ref={sheetRef}
        defaultOverlayOpacity={0}
        // containerStyle={{}}
        closable={false}
        gestureEnabled={true}
        CustomHeaderComponent={<View />}
      >
        <View
          style={{
            rowGap: ms(25),
            minHeight: '55%',
            padding: ms(15),
            backgroundColor: Colors.yellowDim,
          }}
        >
          {entry?.data.map((item) => {
            const questionTxt = item.title;
            const answerTxt = item?.answer || 'No Answer Provided';

            return (
              <JournalEntryAnswer
                type={item.type}
                question={questionTxt}
                answer={`${answerTxt}`}
                key={item.id}
              />
            );
          })}
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
}

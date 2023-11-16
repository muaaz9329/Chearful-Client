import { useState } from 'react';
import { NavigationHelpers } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconArrowRight, IconX } from 'tabler-icons-react-native';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';

import globalStyles from '@app/assets/global-styles';
import { Wp, hp, wp } from '@app/utils';
import { Colors } from '@app/constants';
import { journalEntries } from '../data/journal-data';
import { JournalEntryDataOption } from '../types';
import { AppText, Heading, MyButton, ProgressBar } from '@app/components';
import { SassyQuiz } from '@app/modules/sassy-quiz';
import VerticalSlider from '@app/modules/vertical-slider/src';

export default function ScreenAddJournalEntry({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const entryQuestions = journalEntries.filter(
    (e) => e.type.id === route.params?.journalType?.id,
  )[0].data;

  const [progress, setProgress] = useState((1 / entryQuestions.length) * 100);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
  const [test, setTest] = useState(0);

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Heading>{route.params?.journalType?.title} Journal</Heading>
          <AppText size="md">{'Morning'} Entry</AppText>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconX size={30} color={Colors.muted} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: ms(30),
        }}
      >
        <ProgressBar showSnail={false} progress={progress} />
      </View>

      <View
        style={{
          marginTop: ms(30),
        }}
      >
        <AppText style={{ textAlign: 'center' }}>
          {currQuestionIdx + 1}/{entryQuestions.length}
        </AppText>

        <View style={{ marginTop: ms(20), rowGap: ms(10) }}>
          <Heading>{entryQuestions[currQuestionIdx].title}</Heading>
          {
            {
              question: (
                <TextInput
                  multiline
                  style={{
                    height: ms(180),
                    backgroundColor: Colors.light,
                    borderRadius: ms(10),
                    borderWidth: 1,
                    borderColor: Colors.muted,
                    padding: ms(10),
                  }}
                />
              ),
              option: (
                <>
                  <SassyQuiz
                    showQuestionTxt={false}
                    showSubmitBtn={false}
                    data={[
                      {
                        id: entryQuestions[currQuestionIdx].id,
                        question: entryQuestions[currQuestionIdx].title,
                        options: (
                          entryQuestions[
                            currQuestionIdx
                          ] as JournalEntryDataOption
                        ).options?.map((o) => ({
                          value: o.id,
                          text: o.title,
                        })),
                      },
                    ]}
                  />
                </>
              ),
              rate: (
                <View style={{ alignItems: 'center', marginTop: ms(30) }}>
                  <VerticalSlider
                    height={hp(40)}
                    width={wp(20)}
                    min={0}
                    max={100}
                    value={test}
                    onChange={(val) => setTest(val)}
                    borderRadius={Wp(50)}
                    maximumTrackTintColor={Colors.white}
                    minimumTrackTintColor={Colors.brandGreen}
                  />
                </View>
              ),
            }[entryQuestions[currQuestionIdx].type]
          }
        </View>
      </View>

      <View style={{ marginTop: 'auto' }}>
        <MyButton
          title=""
          display="inline-center"
          icon={<IconArrowRight size={ms(25)} color={Colors.light} />}
          style={{
            borderRadius: 40,
            padding: ms(15),
          }}
          onPress={() => {
            setCurrQuestionIdx(currQuestionIdx + 1);
            setProgress(((currQuestionIdx + 2) / entryQuestions.length) * 100);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

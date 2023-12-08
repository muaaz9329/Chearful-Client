import { useEffect, useState } from 'react';
import { NavigationHelpers } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconArrowRight, IconX } from 'tabler-icons-react-native';
import { TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';

import globalStyles from '@app/assets/global-styles';
import { Colors } from '@app/constants';
import {
  AnswerInput,
  AppText,
  Heading,
  Loader,
  MyButton,
  ProgressBar,
} from '@app/components';
import { SassyQuiz } from '@app/modules/sassy-quiz';
import { RequestState } from '@app/services/api-service';
import { ownJournalService } from '../journal-service';
import { JournalTypeQuestion } from '../types';

export default function ScreenAddJournalEntry({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const { journalType, kind } = route.params;
  const { id, title } = journalType;

  const [journalDetails, setJournalDetails] = useState<{
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<typeof ownJournalService.getJournalDetails>[0]['onSuccess']
      >[0]['data']
    >;
  }>({
    state: 'loading',
    data: {},
  });
  const [journalQuestions, setJournalQuestions] =
    useState<JournalTypeQuestion[]>();
  const [progress, setProgress] = useState(0);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);

  useEffect(() => {
    ownJournalService.getJournalDetails({
      journalId: id,
      onSuccess: ({ data }) => {
        console.log('data', data);

        const entryQuestions = data.question_answers[0].arrQuestions;
        setJournalQuestions(entryQuestions);
        setProgress((1 / entryQuestions.length) * 100);

        setJournalDetails({
          state: 'loaded',
          data,
        });
      },
      onFailure: () => {
        setJournalDetails({
          state: 'erred',
          data: {},
        });
      },
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Heading>{title} Journal</Heading>
          <AppText size="md">
            {kind === 'owm' ? new Date().toLocaleDateString() : `Morning Entry`}
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconX size={30} color={Colors.muted} />
        </TouchableOpacity>
      </View>

      {
        {
          idle: <></>,
          loading: <Loader />,
          erred: <AppText>Something went wrong</AppText>,
          loaded: (
            <>
              {journalQuestions && (
                <>
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
                      {currQuestionIdx + 1}/{journalQuestions.length}
                    </AppText>

                    <View style={{ marginTop: ms(20), rowGap: ms(10) }}>
                      <Heading>
                        {journalQuestions[currQuestionIdx].question_title}
                      </Heading>
                      {
                        {
                          short_answer: <AnswerInput />,
                          single_answer: (
                            <>
                              {/* <SassyQuiz
                            showQuestionTxt={false}
                            showSubmitBtn={false}
                            data={[
                              {
                                id: journalQuestions[currQuestionIdx].id,
                                question: journalQuestions[currQuestionIdx].question_title,
                                options: (
                                  journalQuestions[currQuestionIdx]
                                )?.map((o) => ({
                                  value: o.id,
                                  text: o.title,
                                })),
                              },
                            ]}
                          /> */}
                            </>
                          ),
                          multiple_answer: <></>,
                        }[journalQuestions[currQuestionIdx].question_type]
                      }
                    </View>
                  </View>

                  <View style={{ marginTop: 'auto' }}>
                    <MyButton
                      title=""
                      display="inline-center"
                      icon={
                        <IconArrowRight size={ms(25)} color={Colors.light} />
                      }
                      style={{
                        borderRadius: 40,
                        padding: ms(15),
                      }}
                      onPress={() => {
                        setCurrQuestionIdx(currQuestionIdx + 1);
                        setProgress(
                          ((currQuestionIdx + 1) / journalQuestions.length) *
                            100,
                        );
                      }}
                    />
                  </View>
                </>
              )}
            </>
          ),
        }[journalDetails.state]
      }
    </SafeAreaView>
  );
}

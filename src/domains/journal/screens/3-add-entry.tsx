import { useEffect, useState } from 'react';
import { NavigationHelpers } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconArrowRight, IconX } from 'tabler-icons-react-native';
import { TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

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
import { assignedJournalService, ownJournalService } from '../journal-service';
import { JournalTypeQuestion } from '../types';

import SuccessLottie from '@app/assets/lotties/success-lottie.json';
import { Wp, capitalizeFirstLetter, formatDate } from '@app/utils';

export default function ScreenAddJournalEntry({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const { journalType, kind, frequency, entry } = route.params;

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

  const [userAnswers, setUserAnswers] = useState<
    {
      questionId: number;
      type: 'short_answer' | 'single_answer' | 'multiple_answer';
      answers: string[];
    }[]
  >([]);

  const [submissionState, setSubmissionState] = useState<RequestState>('idle');

  useEffect(() => {
    ownJournalService.getJournalDetails({
      journalId: journalType.id,
      onSuccess: ({ data }) => {
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

  // console.log(
  //   userAnswers.map((ua) => ({
  //     questionId: ua.questionId,
  //     type: ua.type,
  //     answers: ua.answers,
  //   })),
  // );

  const submitEntry = () => {
    setSubmissionState('loading');

    const service = kind === 'own' ? ownJournalService : assignedJournalService;

    service.createEntry({
      parentId: kind === 'own' ? journalType.id : entry.id,
      entryData: userAnswers,
      onSuccess: ({ data }) => {
        setSubmissionState('loaded');
        setJournalDetails((prev) => ({
          ...prev,
          state: 'idle',
        }));
      },
      onFailure: ({ message }) => {
        console.log(message);
        setSubmissionState('erred');
      },
    });
  };

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Heading>{journalType.title} Journal</Heading>
          <AppText size="md">
            {kind === 'owm'
              ? formatDate(new Date().toString())
              : capitalizeFirstLetter(frequency.journal_time || '')}{' '}
            Entry - {formatDate(entry?.date || new Date().toString())}
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
                          short_answer: (
                            <AnswerInput
                              value={
                                userAnswers.find(
                                  (ua) =>
                                    ua.questionId ===
                                    journalQuestions[currQuestionIdx].id,
                                )?.answers[0] || ''
                              }
                              onChangeText={(text) => {
                                const newAnswers = userAnswers.filter(
                                  (ua) =>
                                    ua.questionId !==
                                    journalQuestions[currQuestionIdx].id,
                                );
                                newAnswers.push({
                                  questionId:
                                    journalQuestions[currQuestionIdx].id,
                                  type: 'short_answer',
                                  answers: [text],
                                });
                                setUserAnswers(newAnswers);
                              }}
                            />
                          ),
                          single_answer: (
                            <>
                              <SassyQuiz
                                showQuestionTxt={false}
                                showSubmitBtn={false}
                                data={[
                                  {
                                    id: journalQuestions[currQuestionIdx].id,
                                    question:
                                      journalQuestions[currQuestionIdx]
                                        .question_title,
                                    options: journalQuestions[
                                      currQuestionIdx
                                    ].answers.map((a) => ({
                                      value: a?.id as number,
                                      text: a?.option_title as string,
                                    })),
                                  },
                                ]}
                                onOptionPress={(qId, value) => {
                                  const newAnswers = userAnswers.filter(
                                    (ua) => ua.questionId !== qId,
                                  );
                                  newAnswers.push({
                                    questionId: Number(qId),
                                    type: 'single_answer',
                                    answers: [`${value}`],
                                  });
                                  setUserAnswers(newAnswers);
                                }}
                              />
                            </>
                          ),
                          multiple_answer: (
                            <>
                              <SassyQuiz
                                showQuestionTxt={false}
                                showSubmitBtn={false}
                                variant="multiple"
                                data={[
                                  {
                                    id: journalQuestions[currQuestionIdx].id,
                                    question:
                                      journalQuestions[currQuestionIdx]
                                        .question_title,
                                    options: journalQuestions[
                                      currQuestionIdx
                                    ].answers.map((a) => ({
                                      value: a?.id as number,
                                      text: a?.option_title as string,
                                    })),
                                  },
                                ]}
                                onOptionPress={(qId, value) => {
                                  if (
                                    userAnswers
                                      .find((ua) => ua.questionId === qId)
                                      ?.answers.includes(`${value}`)
                                  ) {
                                    const newAnswers = userAnswers.filter(
                                      (ua) => ua.questionId !== qId,
                                    );
                                    newAnswers.push({
                                      questionId: Number(qId),
                                      type: 'multiple_answer',
                                      answers:
                                        userAnswers
                                          .find((ua) => ua.questionId === qId)
                                          ?.answers.filter(
                                            (a) => a !== `${value}`,
                                          ) || [],
                                    });
                                    setUserAnswers(newAnswers);
                                  } else {
                                    const newAnswers = userAnswers.filter(
                                      (ua) => ua.questionId !== qId,
                                    );
                                    newAnswers.push({
                                      questionId: Number(qId),
                                      type: 'multiple_answer',
                                      answers: [
                                        ...(userAnswers.find(
                                          (ua) => ua.questionId === qId,
                                        )?.answers || []),
                                        `${value}`,
                                      ],
                                    });
                                    setUserAnswers(newAnswers);
                                  }
                                }}
                              />
                            </>
                          ),
                        }[journalQuestions[currQuestionIdx].question_type]
                      }
                    </View>
                  </View>

                  <View style={{ marginTop: 'auto' }}>
                    {
                      // if not last question
                      currQuestionIdx !== journalQuestions.length - 1 ? (
                        <MyButton
                          title=""
                          display="inline-center"
                          icon={
                            <IconArrowRight
                              size={ms(25)}
                              color={Colors.light}
                            />
                          }
                          style={{
                            borderRadius: 40,
                            padding: ms(15),
                          }}
                          onPress={() => {
                            setCurrQuestionIdx(currQuestionIdx + 1);
                            setProgress(
                              ((currQuestionIdx + 1) /
                                journalQuestions.length) *
                                100,
                            );
                          }}
                        />
                      ) : (
                        <MyButton title="Submit" onPress={submitEntry} />
                      )
                    }
                  </View>
                </>
              )}
            </>
          ),
        }[journalDetails.state]
      }

      {submissionState === 'loaded' && (
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <LottieView
            source={SuccessLottie}
            autoPlay
            loop={false}
            style={{
              width: Wp(180),
              height: Wp(180),
            }}
          />

          <Heading>Entry Successfully Submitted</Heading>
        </View>
      )}
    </SafeAreaView>
  );
}

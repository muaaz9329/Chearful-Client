// Packages Imports
import { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { NavigationHelpers, RouteProp } from '@react-navigation/native';

// General Helpers and Constants
import apiService from '@app/services/api-service/api-service';
import { getAuthHeaders } from '@app/utils';
import { hp } from '@app/utils';
import globalStyles from '@app/assets/global-styles';

// Modules
import { SassyQuiz, SassyQuizSelectedOption } from '@app/modules/sassy-quiz';

// Screen Related Imports
import { ChallengeQuestionsData } from '../../types';
import { challengeStorageKeys } from '../../constants';
import useQuizAssessment from '../../hooks/use-quiz-assessment';
import { ErrorRetry, Heading, Loader, ProgressBar } from '@app/components';
import ThirtyXThirtyService from '../../thirty-x-thirty-services';
import { useChallengeStore } from '../Challenge-Home/hooks/use-challenge-store';
import { ThirtyxThirtyNavigator } from '../../navigation/thirty-x-thirty-navigation-stack';

/**
 * A private function to generate the quiz data from the API response
 */
const _generateQuizData = (
  data: ChallengeQuestionsData['assessment_groups'][0]['arrQuestions'],
) => {
  return data.map((item) => {
    return {
      id: item.id,
      question: item.question_title,
      options: item.answers.map((option) => {
        return {
          text: option.option_title,
          value: option.id,
        };
      }),
    };
  });
};

/**
 * Quiz Assessment Screen
 * @description Shows the quiz assessment screen
 */
export default function QuizAssessmentScreen({
  navigation,
  route: { params },
}: {
  navigation: NavigationHelpers<any, any>;
  route: RouteProp<any, any>;
}) {
  const [progress, setProgress] = useState(0);
  const [savingQuiz, setSavingQuiz] = useState(false);

  const { data: assessment, status, setQuizAssessment } = useQuizAssessment();
  const { setReloadChallenge } = useChallengeStore();

  const loadAssessment = () => {
    ThirtyXThirtyService.getChallengeQuestions({
      questionId: params!.questionId,
      onSuccess: ({ data }) => {
        setQuizAssessment({
          status: 'loaded',
          data: data,
        });
      },
      onFailure: ({ error }) => {
        console.log(
          'Error ---- while getting screener challenge questions',
          error,
        );

        setQuizAssessment({
          status: 'erred',
          data: null,
        });
      },
    });
  };

  const handleQuizSubmit = (selectedOptions: SassyQuizSelectedOption[]) => {
    setSavingQuiz(true);

    getAuthHeaders().then((headers) => {
      apiService.post({
        url: '/website/assessments/submit-assessment',
        headers,
        data: {
          assessment_id: assessment?.survey_id,
          answers: selectedOptions.reduce((acc, curr) => {
            acc[curr.qId] = {
              answer: curr.value,
            };
            return acc;
          }, {} as { [key: string]: { answer: string | number } }),
        },
        onSuccess: ({ message }) => {
          AsyncStorage.setItem(
            challengeStorageKeys.hasCompletedAssessment,
            'true',
          );

          Toast.show({
            type: 'SuccessToast',
            text1: message || 'Successfully saved',
          });
          setSavingQuiz(false);

          if (params?.questionId) setReloadChallenge(true);

          // This behavior is static now. Gonna implement dynamic behavior soon
          navigation.navigate(ThirtyxThirtyNavigator.ChallengeHomeScreen);
        },
        onFailure: ({ message, error }) => {
          console.log(error);

          setSavingQuiz(false);
          onPrevQuestion();
          Toast.show({
            type: 'ErrorToast',
            text1: message || 'Something went wrong',
          });
        },
      });
    });
  };

  const onNextQuestion = (_: SassyQuizSelectedOption) => {
    setProgress((prev) => prev + (assessment?.percent_per_question || 1));
  };

  const onPrevQuestion = () => {
    setProgress((prev) => prev - (assessment?.percent_per_question || 1));
  };

  useEffect(() => {
    if (!!params?.questionId) {
      setQuizAssessment({
        status: 'loading',
        data: null,
      });

      loadAssessment();
    }
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/green-gradient.png')}
      style={{
        flex: 1,
      }}
      imageStyle={{
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        bottom: 0,
      }}
    >
      <SafeAreaView
        style={[
          globalStyles.bodyWrapper,
          {
            backgroundColor: 'transparent',
          },
        ]}
      >
        {status === 'loading' ? (
          <Loader />
        ) : status === 'erred' ? (
          <ErrorRetry
            onRetry={() => {
              // Resetting State
              setQuizAssessment({
                status: 'loading',
              });

              // Loading Assessment
              loadAssessment();
            }}
          />
        ) : (
          <>
            <Heading
              size="xl"
              style={[
                globalStyles.textCenter,
                globalStyles.nunito_800,
                {
                  marginVertical: 15,
                },
              ]}
            >
              {assessment?.assessment_detail.assesment_title}
            </Heading>

            <ProgressBar progress={progress} colorScheme="primary" showSnail />

            <View style={{ marginTop: hp(5) }}>
              {savingQuiz ? (
                <Loader />
              ) : (
                <SassyQuiz
                  data={_generateQuizData(
                    assessment?.assessment_groups[0].arrQuestions!,
                  )}
                  callOnNextOnSubmit
                  onNextPress={onNextQuestion}
                  onPrevPress={onPrevQuestion}
                  onSubmit={handleQuizSubmit}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

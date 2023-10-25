import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Banner from './components/banner';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChallengeBox from './components/challenge-box';
import AssessmentBox from './components/assessment-box';
import Scoreboard from './components/scoreboard';
import BlogCards from './components/blog-cards';
import ThirtyXThirtyService from '../../thirty-x-thirty-services';
import { Assessment } from '../../types';
import {
  deserializeAsses,
  deserializeAssessment,
} from '../../adapters/thirty-x-thirty';
import useQuizAssessment from '../../hooks/use-quiz-assessment';
import { RequestState } from '@app/services/api-service';
import { useChallengeStore } from './hooks/use-challenge-store';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { IsTablet, Wp, mergeStyles } from '@app/utils';
import { ErrorRetry, Header, Loader } from '@app/components';

const ChallengeHome = () => {
  const navigation = useNavigation();
  const { setQuizAssessment } = useQuizAssessment();

  const handleNavigation = (questionId: number, assessmentId: number) => {
    // @ts-ignore
    navigation.navigate('TYPE-OF-CHALLENGE-SCREEN', {
      questionId,
      assessmentId,
    });
  };

  const { setNumberOfChallenge, reloadChallenge, setReloadChallenge } =
    useChallengeStore();

  const [assessment, setAssessment] = useState<{
    assessments: Assessment[];
    metaData: any;
    status: RequestState;
  }>({
    assessments: [],
    metaData: {},
    status: 'loading',
  });

  const loadChallengesList = () => {
    ThirtyXThirtyService.getChallenges({
      onSuccess: ({ data, ...extras }) => {
        setAssessment({
          assessments: data,
          metaData: extras,
          status: 'loaded',
        });
      },
      onFailure: (err) => {
        console.log(err);
        setAssessment({
          assessments: [],
          metaData: {},
          status: 'erred',
        });
      },
    });
  };

  // TODO: apply useFocusEffect if needed to automatically refresh the page when user comes back to this screen
  useEffect(() => {
    loadChallengesList();
  }, []);

  useEffect(() => {
    if (reloadChallenge) {
      setAssessment({
        assessments: [],
        metaData: {},
        status: 'loading',
      });
      loadChallengesList();
      setReloadChallenge(false);
    }
  }, [reloadChallenge]); // once the challenge is submitted, reload the challenge screen

  //* Setting no of challenges and current challenge
  useEffect(() => {
    if (assessment.status === 'loaded') {
      setNumberOfChallenge(assessment.assessments.length);
    }
  }, [assessment]);

  return (
    <SafeAreaView style={[globalStyles.pt_16, globalStyles.bg_white]}>
      <ScrollView>
        <View style={globalStyles.px_20}>
          <Header pram="tab-navigation" />
        </View>

        <View
          style={[
            globalStyles.mt_15,
            IsTablet && { ...globalStylesFunc.w(80), alignSelf: 'center' },
          ]}
        >
          <Banner />
        </View>
        <View
          style={[
            globalStyles.px_20,
            IsTablet &&
              mergeStyles(
                globalStylesFunc.w(80),
                { alignSelf: 'center' },
                globalStylesFunc.px(0),
              ),
          ]}
        >
          {assessment.status === 'erred' ? (
            <ErrorRetry
              onRetry={() => {
                setAssessment({
                  assessments: [],
                  metaData: {},
                  status: 'loading',
                });
                loadChallengesList();
              }}
            />
          ) : assessment.status === 'loading' ? (
            <Loader
              style={{
                marginVertical: 20,
              }}
            />
          ) : (
            <>
              <Scoreboard {...assessment?.metaData} />
              <BlogCards />
              <View style={styles.assessmentWrapper}>
                {assessment.assessments?.map((item: Assessment, index) => {
                  if (item.assesment.assessment_type === 'challenge') {
                    const assessmentData = deserializeAssessment(item, index);
                    return (
                      <ChallengeBox
                        key={index}
                        index={assessmentData.index}
                        handleNavigaiton={handleNavigation}
                        {...assessmentData}
                      />
                    );
                  } else {
                    const assessmentData = deserializeAsses(item);
                    return (
                      <AssessmentBox
                        key={index + '-item'}
                        conditon={assessmentData?.status as any}
                        onPress={() => {
                          setQuizAssessment({
                            status: 'loading',
                            data: null,
                          });
                          // @ts-ignore
                          navigation.navigate('QUIZ-ASSESSMENT-SCREEN', {
                            questionId: assessmentData?.questionId,
                          });
                        }}
                      />
                    );
                  }
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeHome;

const styles = StyleSheet.create({
  assessmentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: Wp(20),
  },
});

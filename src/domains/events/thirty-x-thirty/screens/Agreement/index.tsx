// Packages Imports
import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Assets, Constants, Helpers
import globalStyles from '@app/assets/global-styles';
import { IsTablet } from '@app/utils';
import { ChevronLeft } from '@app/assets/svgs/';
import { IconComponent } from '@app/types';
import { colorWithOpacity, decodeHTML, stripHTML } from '@app/utils';
import {
  AppText,
  ErrorRetry,
  Header,
  Heading,
  Loader,
  MyButton,
} from '@app/components';
import { Colors } from '@app/constants';
import { Wp, wp } from '@app/utils';

// Screen Helpers
import { challengeStorageKeys } from '../../constants';
import useQuizAssessment from '../../hooks/use-quiz-assessment';
import ThirtyXThirtyService from '../../thirty-x-thirty-services';

// Screen Components
import StepsToParticipateModel from './components/modals/steps-to-participate-model';
import Toast from 'react-native-toast-message';

/**
 * Agreement Screen
 * @description Shows the agreement screen for the fitness assessment
 *
 * @note As of now, this AgreementScreen is tightly coupled for FitnessAssessment Agreement only.
 */
const AgreementScreen = ({ navigation }: { navigation: any }) => {
  // Steps Modal State
  const [visible, setVisible] = React.useState(true);
  // Agreement State
  const [isAgreed, setIsAgreed] = React.useState(false);

  const { status, data: Assessment, setQuizAssessment } = useQuizAssessment();

  const loadFitnessAssessment = () => {
    ThirtyXThirtyService.getFitnessScreenerId({
      onSuccess: ({ data: { screenerAssessmentId } }) => {
        ThirtyXThirtyService.getChallengeQuestions({
          questionId: screenerAssessmentId,
          onSuccess: ({ data }) => {
            console.log({ data });

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
          },
        });
      },
      onFailure: ({ error, message }) => {
        console.log('Error ---- while getting challenge screener id', error);

        if (
          error.status === 404 &&
          error?.data?.message?.includes('available')
        ) {
          // If it is not available, it means user has already taken the assessment
          AsyncStorage.setItem(
            challengeStorageKeys.hasCompletedAssessment,
            'true',
          );

          navigation.navigate('CHALLENGE-SCREEN');
        } else {
          setQuizAssessment({
            status: 'erred',
          });

          Toast.show({
            type: 'ErrorToast',
            text1: message || 'Something went wrong',
          });
        }
      },
    });
  };

  useEffect(() => {
    loadFitnessAssessment();
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/green-texture-gradient.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <SafeAreaView
          style={[
            globalStyles.bodyWrapper,
            {
              backgroundColor: 'white',
            },
          ]}
        >
          {status === 'loading' ? (
            <Loader />
          ) : status === 'erred' ? (
            <ErrorRetry
              onRetry={() => {
                setQuizAssessment({
                  status: 'loading',
                });
                loadFitnessAssessment();
              }}
            />
          ) : (
            <>
              <StepsToParticipateModel
                visible={visible}
                setVisible={setVisible}
              />

              <Header
                navigation={navigation}
                pram="back"
                Icon={ChevronLeft as IconComponent}
              />

              <View style={[globalStyles.mt_15]}>
                <Heading
                  size="lg"
                  style={[
                    globalStyles.px_20,
                    globalStyles.textCenter,
                    globalStyles.nunito_800,
                    {
                      marginBottom: 12,
                    },
                  ]}
                >
                  {Assessment?.assessment_detail?.assesment_title}
                </Heading>

                <Heading
                  size="md"
                  style={[
                    globalStyles.textCenter,
                    { color: colorWithOpacity(Colors.primary, 0.6) },
                  ]}
                >
                  {decodeHTML(
                    stripHTML(Assessment?.assessment_detail?.description!),
                  )}
                </Heading>

                <View
                  style={[
                    globalStyles.flexRow,
                    globalStyles.alignStart,
                    {
                      marginTop: 30,
                      marginHorizontal: 'auto',
                      width: IsTablet ? wp(80) : Wp(320),
                    },
                  ]}
                >
                  <BouncyCheckbox
                    size={25}
                    fillColor={Colors.primary}
                    unfillColor="#FFFFFF"
                    iconStyle={{
                      borderColor: Colors.primary,
                    }}
                    innerIconStyle={{
                      borderWidth: 2,
                    }}
                    disableText={true}
                    onPress={(isChecked: boolean) => {
                      setIsAgreed(isChecked);
                    }}
                    style={{
                      marginRight: Wp(10),
                    }}
                  />
                  <AppText>
                    By clicking “Agree” you acknowledge that this screener will
                    help you understand your level of general mental fitness. It
                    is not a diagnostic tool. Any concerns you may have should
                    be discussed with a mental health practitioner. If you
                    believe your symptoms are severe, and you are in need of
                    urgent care, please use the following link to find the
                    emergency number in your country.
                  </AppText>
                </View>

                <MyButton
                  title="Take the Screener"
                  display="inline-center"
                  style={{ marginTop: 20 }}
                  disabled={!isAgreed}
                  onPress={() => {
                    //@ts-ignore
                    navigation.navigate('QUIZ-ASSESSMENT-SCREEN');
                  }}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default AgreementScreen;

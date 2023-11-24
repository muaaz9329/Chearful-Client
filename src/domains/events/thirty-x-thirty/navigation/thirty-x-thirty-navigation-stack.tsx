import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { challengeStorageKeys } from '../constants';
import useAppState from '@app/hooks/use-app-state';
import globalStyles from '@app/assets/global-styles';
import { Loader } from '@app/components';
import { AppNavigator } from '@app/navigation';
import { AuthNavigator } from '@app/domains/authentication/';
import {
  ScreenLanding,
  ScreenAgreement,
  ScreenQuizAssessment,
  ScreenChallengeHome,
  ScreenTypeOfChallenge,
} from '../screens';

export const enum ThirtyXThirtyNavigator {
  'LandingScreen' = 'LandingScreen',
  'AgreementScreen' = 'AgreementScreen',
  'QuizAssessmentScreen' = 'QuizAssessmentScreen',
  'ChallengeHomeScreen' = 'ChallengeHomeScreen',
  'TypeOfChallengeScreen' = 'TypeOfChallengeScreen',
}

export default function ThirtyXThirtyNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RedirectingScreen" component={RedirectScreen} />
      <Stack.Screen
        name={ThirtyXThirtyNavigator.LandingScreen}
        component={ScreenLanding}
      />
      <Stack.Screen
        name={ThirtyXThirtyNavigator.AgreementScreen}
        component={ScreenAgreement}
      />
      <Stack.Screen
        name={ThirtyXThirtyNavigator.QuizAssessmentScreen}
        component={ScreenQuizAssessment}
      />
      <Stack.Screen
        name={ThirtyXThirtyNavigator.ChallengeHomeScreen}
        component={ScreenChallengeHome}
      />
      <Stack.Screen
        name={ThirtyXThirtyNavigator.TypeOfChallengeScreen}
        component={ScreenTypeOfChallenge}
      />
    </Stack.Navigator>
  );
}

const RedirectScreen = ({ navigation }: { navigation: any }) => {
  const { isUserLoggedIn } = useAppState();

  const getRedirected = async () => {
    const hasCompletedAssessment = await AsyncStorage.getItem(
      challengeStorageKeys.hasCompletedAssessment,
    );

    console.log({
      hasCompletedAssessment,
      isUserLoggedIn,
    });

    /*
    Redirecting to correct screen:
      if user has completed assessment, redirect to challenge screen.
      Else take him to landing screen for challenge so that he can start challenge and take 
      initial assessment
      */
    if (hasCompletedAssessment === 'true') {
      // If the user is logged in and has already taken assessment, redirect to challenge screen
      if (isUserLoggedIn) {
        navigation.replace(ThirtyXThirtyNavigator.ChallengeHomeScreen);
      }
      // else ask him to login first to get to challenges screen
      else {
        navigation.navigate(AppNavigator.Auth, {
          screen: AuthNavigator.Login,
        });
      }
    } else {
      navigation.replace(ThirtyXThirtyNavigator.LandingScreen);
    }
  };

  useEffect(() => {
    getRedirected();
  }, []);

  return (
    <View style={globalStyles.bodyWrapper}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </View>
    </View>
  );
};

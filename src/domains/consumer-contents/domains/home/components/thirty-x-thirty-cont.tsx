import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationHelpers } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAppState from '@app/hooks/use-app-state';
import { IsTablet, Wp, wp } from '@app/utils';
import { AppText, Heading, MyButton } from '@app/components';
import { Colors } from '@app/constants';
import { challengeStorageKeys } from '@app/domains/events/thirty-x-thirty/constants';
import { AppNavigator } from '@app/navigation/app-navigation';
import { AuthNavigator } from '@app/domains/authentication';

const ThirtyXThirtyCont = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const { isUserLoggedIn } = useAppState();

  const btnString = async () => {
    const hanCompletedAssessment = await AsyncStorage.getItem(
      challengeStorageKeys.hasCompletedAssessment,
    );

    if (isUserLoggedIn) {
      if (hanCompletedAssessment) {
        return 'Accept Challenge';
      } else {
        return 'Start Now';
      }
    } else {
      return 'Register Now';
    }
  };

  const handleNavigation = async () => {
    if (isUserLoggedIn) {
      navigation.navigate(AppNavigator.ThirtyXThirty);
    } else {
      navigation.navigate(AppNavigator.Auth, {
        screen: AuthNavigator.Login,
        params: {
          redirect: AppNavigator.ThirtyXThirty,
        },
      });
    }
  };

  const [btnTitle, setBtnTitle] = useState<string>('');

  useEffect(() => {
    btnString().then((res) => setBtnTitle(res));
  }, [isUserLoggedIn]);

  return (
    <View>
      <Animated.View
        entering={FadeInDown.springify()}
        style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
      >
        <Heading
          size="xl"
          style={{
            textAlign: 'center',
          }}
        >
          The <Text style={styles.orangeText}>30/30</Text> Mental Fitness{' '}
          <Text style={styles.orangeText}>Challenge</Text>
        </Heading>

        <AppText
          style={{
            textAlign: 'center',
            color: '#7F9090',
            marginVertical: wp(3),
          }}
        >
          Chearful’s Mental Fitness Challenge Will Help You take Your Well-being
          to the Next Level - Practice Every Day & Find Your Strength!
        </AppText>

        <MyButton
          title={btnTitle}
          onPress={handleNavigation}
          style={{ width: wp(50), alignSelf: 'center', borderRadius: Wp(12) }}
        />
      </Animated.View>
    </View>
  );
};

export default ThirtyXThirtyCont;

const styles = StyleSheet.create({
  orangeText: {
    color: Colors.orange,
  },
  sectionPadding: {
    paddingVertical: wp(5),
  },
  tabletSection: {
    width: wp(70),
    alignSelf: 'center',
  },
});

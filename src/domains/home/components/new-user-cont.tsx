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
import { AppNavigator } from '@app/navigation';
import { AuthNavigator } from '@app/domains/authentication';
import { ThirtyXThirtyNavigator } from '@app/domains/events/thirty-x-thirty/navigation/thirty-x-thirty-navigation-stack';
import { MoodDiaryNavigator } from '@app/domains/mood-dairy/navigation';

function isFeatureAvailable() {
  return true;
}

const NewUserCont = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const { isUserLoggedIn } = useAppState();

  const btnString = async () => {
    return 'Register Now';
  };

  const handleNavigation = async () => {
    
      navigation.navigate(AppNavigator.Auth, {
        screen: AuthNavigator.Login,
      });
    
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
          Welcome To <Text style={styles.orangeText}>Chearful</Text> Mental
          Fitness <Text style={styles.orangeText}>App</Text>
        </Heading>

        <AppText
          style={{
            textAlign: 'center',
            color: '#7F9090',
            marginVertical: wp(3),
          }}
        >
          Chearful’s Mental Fitness App Will Help You take Your Well-being to
          the Next Level - Sign in Now to use Mood Diary , Journals and other
          exciting features !
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

export default NewUserCont;

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

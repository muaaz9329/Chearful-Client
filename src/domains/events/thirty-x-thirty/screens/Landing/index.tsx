import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  SlideInDown,
  SlideInRight,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChallengeAttributes from './components/challenge-attributes';
import ChallengeBenefits from './components/challenge-benefits';
import ChallengeWorking from './components/challenge-working';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useAppState from '@app/hooks/use-app-state';
import globalStyles from '@app/assets/global-styles';
import { IsTablet, wp } from '@app/utils';
import { AppText, Header, Heading, MyButton } from '@app/components';
import { Colors } from '@app/constants';
import { AppNavigator } from '@app/navigation';
import { AuthNavigator } from '@app/domains/authentication';
import { ThirtyXThirtyNavigator } from '../../navigation/thirty-x-thirty-navigation-stack';

export default function ThirtyChallengeLandingScreen() {
  const navigation = useNavigation();
  const { isUserLoggedIn } = useAppState();

  const handleNavigation = () => {
    //@ts-ignore
    navigation?.navigate(
      // @ts-ignore
      // TODO: add enum for remaining
      isUserLoggedIn ? AppNavigator.ThirtyXThirty : AppNavigator.Auth,
      {
        // User gets to landing screen of challenge iff he has not yet agreed or went through the fitness assessment.
        // if he has already taken the assessment, that will be checked and he shall be redirected to appropriate screen by RedirectingScreen
        screen: isUserLoggedIn
          ? ThirtyXThirtyNavigator.AgreementScreen
          : AuthNavigator.Login,
      },
    );
  };

  return (
    <SafeAreaView style={[globalStyles.bodyWrapper]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header pram={AppNavigator.HomeTabs} navigation={navigation} />
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
            Chearful’s Mental Fitness Challenge Will Help You take Your
            Well-being to the Next Level - Practice Every Day & Find Your
            Strength!
          </AppText>

          <MyButton
            title={isUserLoggedIn ? 'Start Now' : 'Register Now'}
            onPress={handleNavigation}
          />
        </Animated.View>

        <Animated.View
          style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
          entering={SlideInRight.delay(200)}
        >
          <ChallengeAttributes />
        </Animated.View>

        <Animated.View
          entering={SlideInDown.delay(300).springify()}
          style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
        >
          <Heading size="lg" style={globalStyles.textCenter}>
            The Chearful 30 day Mental fitness this Year is:
            <Text style={[styles.orangeText]}> Win, Victory & Love</Text>
          </Heading>
          <View style={{ alignItems: 'center', marginTop: wp(4) }}>
            <Image
              source={require('../../assets/images/uae-prince-challenge.png')}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
          entering={FadeInDown.springify()}
        >
          <ChallengeBenefits />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.springify()}
          style={[styles.sectionPadding, IsTablet && styles.tabletSection]}
        >
          <Heading size="lg" style={globalStyles.textCenter}>
            How Your Challenge will work
          </Heading>
          <AppText
            style={[
              globalStyles.textCenter,
              {
                color: Colors.dim,
              },
            ]}
          >
            We’ve made it simple for you to register and start your journey to a
            mentally fit you
          </AppText>

          <View style={{ alignItems: 'center', marginTop: wp(4) }}>
            <ChallengeWorking />
          </View>
        </Animated.View>

        <View
          style={[
            IsTablet && styles.tabletSection,
            {
              padding: 25,
              backgroundColor: Colors.greenDim,
              borderRadius: 12,
            },
          ]}
        >
          <View style={globalStyles.alignCenter}>
            <IonIcon name="warning-outline" color={Colors.yellow} size={40} />
          </View>
          <Heading
            size="sm"
            style={{
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            If you, or someone you know, is in need of emergency care or urgent
            crisis intervention, please contact your local emergency numbers
            immediately
          </Heading>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

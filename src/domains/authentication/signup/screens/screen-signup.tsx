import { Platform, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@app/components';
import { IsPhone, Wp } from '@app/utils';
import { Colors } from '@app/constants';

import MobileView from '../views/mobile-view';
import TabletView from '../views/tablet-view';

import { ActivityIndicator } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import useValidation from '../hooks/use-validation';

import { StackActions, useNavigation } from '@react-navigation/native';
import useSignupStore from '../hooks/use-signup-store';
import { AuthNavigator } from '../../navigation';

export type SignUpFunc = (text: string, name: string) => void;

const SignUp = () => {
  const navigation = useNavigation();
  const { handleForm, loading } = useValidation();

  const { Success } = useSignupStore();

  useEffect(() => {
    if (Success) {
      //ts-ignore
      navigation.dispatch(StackActions.replace(AuthNavigator.Login));
    }
  }, [Success]);

  return (
    <SafeAreaView edges={['top']} style={styles.Body}>
      {loading && (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      )}
      <Header pram={'back'} navigation={navigation} />

      {IsPhone ? (
        <MobileView handleForm={handleForm} />
      ) : (
        <TabletView handleForm={handleForm} />
      )}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  ActivityIndicator: {
    position: 'absolute',
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,    255,    255,   0.5)',
    zIndex: 100,
  },
  HeaderLogo: {
    alignItems: 'center',
  },

  Body: {
    paddingHorizontal: Wp(16),
    paddingTop: Platform.OS === 'android' ? Wp(20) : Wp(10),
    flex: 1,
    backgroundColor: Colors.white,
  },
});

import { Platform, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@app/common/components/Header';
import { ChevronLeft } from '@app/svgs/Index';
import { Wp } from '@app/helper/CustomResponsive';
import { AppColors } from '@app/constants/app-colors';
import { IconComponent } from '@app/types';
import { DeviceContext } from '@app/context/Device-Type/DeviceTypeProvider';

import MobileView from '../views/mobile-view';
import TabletView from '../views/tablet-view';

import { ActivityIndicator } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import useValidation from '../hooks/use-validation';

import { useNavigation } from '@react-navigation/native';
import useSignupStore from '../hooks/use-signup-store';

export type SignUpFunc = (text: string, name: string) => void;

const SignUp = () => {
  const navigation = useNavigation();
  const { deviceType } = useContext(DeviceContext);
  const { handleForm, loading } = useValidation();

  const { Success } = useSignupStore();

  useEffect(() => {
    if (Success) {
      //ts-ignore
      navigation.navigate('LOGIN-SCREEN' as never);
    }
  }, [Success]);

  return (
    <SafeAreaView edges={['top']} style={styles.Body}>
      {loading && (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} color={AppColors.Primary} />
        </View>
      )}
      <Header
        Icon={ChevronLeft as IconComponent}
        pram={'back'}
        navigation={navigation}
      />

      {deviceType === 'mobile' ? (
        <MobileView deviceType={deviceType} handleForm={handleForm} />
      ) : (
        <TabletView deviceType={deviceType} handleForm={handleForm} />
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
    paddingTop: Platform.OS == 'android' ? Wp(20) : Wp(10),
    flex: 1,
    backgroundColor: AppColors.White,
  },
});

import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hp, IsPhone, IsTablet, Wp } from '@app/utils';
import { ChearfulLogo, ChevronLeft } from '@app/assets/svgs/';
import { Colors } from '@app/constants';
import { Mulish, Nunito, colorWithOpacity, wp } from '@app/utils';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Header } from '@app/components/';
import ForgetPassBtn from '../components/forget-pass-btn';
import { NavigationHelpers } from '@react-navigation/native';
import { IconComponent } from '@app/types';
import { TextInput } from 'react-native-paper';
import { useForgetPass } from '../hooks/use-forget-pass';
import ResetPassModel from '../components/models/reset-pass-model';
import ForgetPassServices from '../forget-pass-service';

interface Props {
  navigation: NavigationHelpers<any, any>;
}

const ForgetPass = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');

  const {
    Success,
    error,
    resetPasswordLoading,
    resetPasswordSuccess,
    resetPasswordError,
  } = useForgetPass();

  const [model, setModel] = React.useState(false);
  useEffect(() => {
    if (Success) {
      setModel(true);
    }
  }, [Success]);

  useEffect(() => {
    resetPasswordLoading();
  }, []);

  const handleResetPasswordRequest = () => {
    resetPasswordLoading();

    ForgetPassServices.resetPassword({
      email,
      onSuccess: () => {
        resetPasswordSuccess();
      },

      onFailure: ({ message, error }) => {
        console.log(JSON.stringify(error));

        resetPasswordError(
          error?.data?.errors?.email
            ? error?.data?.errors?.email?.[0]
            : message,
        );
      },
    });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ResetPassModel visible={model} setVisible={setModel} />
      <View style={styles.headerCont}>
        <Header
          Icon={ChevronLeft as IconComponent}
          pram={'back'}
          navigation={navigation}
        >
          <ChearfulLogo
            height={IsPhone ? Wp(27) : Wp(20)}
            width={IsPhone ? Wp(122) : Wp(90)}
            color={Colors.primary}
          />
        </Header>
      </View>
      <View>
        <Text
          style={[
            styles.mainTitle,
            IsTablet && {
              fontSize: Wp(18),
              marginVertical: Wp(6),
              textAlign: 'center',
            },
          ]}
        >
          Reset password
        </Text>
        <Text
          style={[
            styles.TextContent,
            IsTablet && {
              fontSize: Wp(13),
              textAlign: 'center',
            },
          ]}
        >
          Lost your password? No problem! Simply enter the associated
          email/username, and we'll send you a password reset link to regain
          access to your account hassle-free.{' '}
        </Text>
        <View style={styles.InputArea}>
          <View
            style={[
              {
                borderRadius: Wp(8),
                overflow: 'hidden',
                width: wp(85),
                marginTop: Wp(20),
                marginBottom: Wp(5),

                borderWidth: 2,
                borderColor: Colors.primary,
              },
              IsTablet && {
                width: wp(70),
                borderRadius: Wp(8),
              },
            ]}
          >
            <TextInput
              mode="flat"
              label="Email"
              placeholder="Enter Your Email Address"
              placeholderTextColor={colorWithOpacity(Colors.primary, 0.6)}
              underlineColor={'#EFF3F2'}
              style={[
                {
                  backgroundColor: '#EFF3F2',
                  height: Platform.OS == 'ios' ? Hp(45) : Hp(50),
                  fontSize: Wp(14),
                },
                IsTablet && {
                  height: Hp(38),
                  width: wp(70),
                  fontSize: Wp(10),
                },
              ]}
              underlineStyle={{ borderRadius: Wp(18) }}
              outlineStyle={{ borderRadius: Wp(18) }}
              onChangeText={(text) => setEmail(text)}
              accessibilityLabelledBy={undefined}
              accessibilityLanguage={undefined}
            />
          </View>
          <ForgetPassBtn
            HandleFunc={handleResetPasswordRequest}
            Text={'Reset'}
          />
          {error.status && <Text style={styles.errorTxt}>{error.message}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: Wp(16),
    paddingHorizontal: Wp(20),
  },
  headerCont: {
    marginBottom: Wp(20),
  },
  mainTitle: {
    fontSize: Wp(30),
    fontFamily: Nunito(800),
    color: Colors.primary,
    marginVertical: Wp(10),
  },
  TextContent: {
    fontSize: Wp(16),
    fontFamily: Mulish(600),
    color: 'black',
    opacity: 0.7,
  },
  TaskInput: {
    fontFamily: Mulish(400),
    fontSize: Wp(14),
    color: Colors.black,
    paddingVertical: Platform.OS == 'android' ? Wp(10) : Wp(13),
    paddingHorizontal: Wp(10),
    backgroundColor: Colors.light,
    borderRadius: Wp(10),
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(6),
    marginTop: Wp(20),
    marginBottom: Wp(20),
  },
  InputArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTxt: {
    fontSize: Wp(12),
    color: Colors.error,
    marginVertical: Wp(20),
  },
});

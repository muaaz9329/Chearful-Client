import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontSize, Hp, Wp } from '@app/helper/CustomResponsive';
import Header from '@CommonComponents/Header';
import { ChearfulLogo, ChevronLeft } from '@app/svgs/Index';
import { AppColors } from '@app/constants/app-colors';
import { Mulish, Nunito } from '@app/helper/FontWeight';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLoginBtn from '@app/common/components/AnimatedLoginbtn';
import { ApiServices } from '@app/services/Apiservice';
import {
  resetPasswordErred,
  resetPasswordLoading,
  resetPasswordSuccess,
} from '@app/features/Reset-Password-Reducers/ResetReducers';
import ResetPassModel from '@app/common/Models/ResetPassModel';
import { NavigationHelpers } from '@react-navigation/native';
import { IconComponent } from '@app/types';
import { DeviceContext } from '@app/context/Device-Type/DeviceTypeProvider';
import { TextInput } from 'react-native-paper';
import { colorWithOpacity } from '@app/helper/customFunction';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import UserService from '@app/services/user-service';

interface Props {
  navigation: NavigationHelpers<any, any>;
}

const ForgetPass = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();
  const { deviceType } = useContext(DeviceContext);

  //TODO:  State Types Redux needed to be added
  const { Success, error } = useSelector((state: any) => state.ResetPass);
  const [model, setModel] = React.useState(false);
  useEffect(() => {
    if (Success) {
      setModel(true);
    }
  }, [Success]);

  useEffect(() => {
    //@ts-ignore
    dispatch(resetPasswordLoading());
  }, []);

  const handleResetPasswordRequest = () => {
    dispatch(resetPasswordLoading());

    UserService.resetPassword({
      email,
      onSuccess: () => {
        dispatch(resetPasswordSuccess());
      },
      onFailure: ({ message, error }) => {
        console.log(JSON.stringify(error));

        dispatch(
          resetPasswordErred(
            error?.data?.errors?.email
              ? error?.data?.errors?.email?.[0]
              : message,
          ),
        );
      },
    });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ResetPassModel
        navigation={navigation}
        visible={model}
        setVisible={setModel}
      />
      <View style={styles.headerCont}>
        <Header
          Icon={ChevronLeft as IconComponent}
          pram={'back'}
          navigation={navigation}
        >
          <ChearfulLogo
            height={deviceType === 'mobile' ? Wp(27) : Wp(20)}
            width={deviceType === 'mobile' ? Wp(122) : Wp(90)}
            color={AppColors.Primary}
          />
        </Header>
      </View>
      <View>
        <Text
          style={[
            styles.mainTitle,
            deviceType === 'tablet' && {
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
            deviceType === 'tablet' && {
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
                borderColor: AppColors.Primary,
              },
              deviceType === 'tablet' && {
                width: wp(70),
                borderRadius: Wp(8),
              },
            ]}
          >
            <TextInput
              mode="flat"
              label="Email"
              placeholder="Enter Your Email Address"
              placeholderTextColor={colorWithOpacity(AppColors.Primary, 0.6)}
              underlineColor={'#EFF3F2'}
              style={[
                {
                  backgroundColor: '#EFF3F2',
                  height: Platform.OS == 'ios' ? Hp(45) : Hp(50),
                  fontSize: Wp(14),
                },
                deviceType === 'tablet' && {
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
          <AnimatedLoginBtn
            HandleFunc={handleResetPasswordRequest}
            ReducerAction={'ResetPass'}
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
    color: AppColors.Primary,
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
    fontSize: FontSize(14),
    color: AppColors.MenuText,
    paddingVertical: Platform.OS == 'android' ? Wp(10) : Wp(13),
    paddingHorizontal: Wp(10),
    backgroundColor: AppColors.OffWhiteCont,
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
    fontSize: FontSize(12),
    color: AppColors.Error,
    marginVertical: Wp(20),
  },
});

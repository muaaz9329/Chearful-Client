import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationHelpers } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

import useAppState from '@app/hooks/use-app-state';
import LoginBtn from '../components/login-btn';
import useLoginStore from '../hooks/use-login-store';
import LoginServices from '../login-service';
import { Colors, Fonts } from '@app/constants';
import { s } from 'react-native-size-matters';
import {
  Hp,
  IsPhone,
  IsTablet,
  Wp,
  colorWithOpacity,
  hp,
  wp,
} from '@app/utils';
import { ChearfulLogo } from '@app/assets/svgs/';

interface props {
  navigation: NavigationHelpers<any, any>;
}

const Login = ({ navigation }: props) => {
  //TODO : State Types Redux needed to be added

  const { Success, error, setLoginSuccess, setLoginError } = useLoginStore();

  const [InputBoxBorders, setInputBoxBorders] = useState<string>('#EFF3F2');
  const [validation, setValidation] = useState({
    state: false,
    error: '',
  });

  const { updateAppState } = useAppState();

  const [pass, SetPass] = useState({
    Pass: true,
    icon: 'eye-off',
  });

  const showPass = () => {
    if (pass.Pass) {
      SetPass({
        Pass: false,
        icon: 'eye',
      });
    } else {
      SetPass({
        Pass: true,
        icon: 'eye-off',
      });
    }
  };

  const [User, setUser] = useState({ email: '', password: '' });

  const HandleLogin = async () => {
    //* Validation of User is Happening here
    if (User.email == '' && User.password == '') {
      setValidation({
        state: true,
        error: 'Please Enter Email and Password',
      });
    } else if (User.email == '') {
      setValidation({
        state: true,
        error: 'Please Enter Your Email Address',
      });
    } else if (User.password == '') {
      setValidation({
        state: true,
        error: 'Please Enter Your Password',
      });
    } else {
      //* Authentication of user is happening here
      // @ts-ignore
      LoginServices.setLogin({
        email: User.email,
        password: User.password,
        onSuccess: ({ data, message }) => {
          // If changing this key in future, change it at all used places probably in getAuthHeaders function

          if (data.role === 'doctor') {
            Toast.show({
              type: 'ErrorToast',
              text1: 'This app is only accessible to patients.',
              text2:
                'Chearful Practitioner App is available for practitioners.',
            });

            return;
          }
          AsyncStorage.setItem('token', data.token);
          setLoginSuccess(data.token);

          updateAppState({
            isUserLoggedIn: true,
          });

          //TODO: Temp changes for testing. This redirect info should be passed through navigation params
          navigation.navigate('THIRTY-X-THIRTY-MODULE');
        },
        onFailure: ({ message }) => {
          setLoginError(message);
        },
      });
    }

    // email and Password is Dispatched to Thunk Function that makes a request to the server and returns a response
    // you can save the response in a variable other wise it Updates the State of the Reducer name AuthReducer
    // Authreducer will Save the Data in Async Storage and will update the State of Success to True
    // ExtraReducers in the AuthReducer can also be used as it consist of the State of the Request
    // test email:"hammad.khan@beaconhousetechnology.com" , password:"12345678@"
  };

  useEffect(() => {
    if (Success) {
      console.log('Success');
      //! this is form which we will set navigation to next page
    }
  }, [Success]); // if Success is True then it will navigate to the Practitioner Home Screen

  useEffect(() => {
    if (error.status) {
      setInputBoxBorders(Colors.error);
      setValidation({
        state: false,
        error: '',
      });
      console.log(error);
    } else {
      setInputBoxBorders('#EFF3F2');
    }
  }, [error]); // use to control the style of input box border when error occurs

  useEffect(() => {
    if (validation.state) {
      Toast.show({
        type: 'ErrorToast',
        text1: validation.error,
      });
    } else if (error.status) {
      Toast.show({
        type: 'ErrorToast',
        text1: 'Please Enter Correct Email or Password',
      });
    }
  }, [validation, error]); // used to show the toast message when error occurs

  return (
    <View style={styles.Container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={[styles.FirstCont, IsTablet && { height: hp(34) }]}>
          <View
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Animatable.View
              animation="fadeInDown"
              duration={2000}
              easing={'ease-in-out'}
            >
              <ChearfulLogo
                height={IsPhone ? wp(30) : wp(20)}
                width={IsPhone ? wp(70) : wp(50)}
                color={Colors.primary}
              />
            </Animatable.View>
          </View>
        </View>
        <View style={styles.SecondCont}>
          <View style={styles.MainTextCont}>
            <Text style={[styles.MainTitle, IsTablet && { fontSize: s(16) }]}>
              Welcome to Chearful!
            </Text>
            <Text
              style={[styles.MainSubtitle, IsTablet && { fontSize: s(10) }]}
            >
              Mental Health Built Around You
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View
              style={[
                {
                  borderRadius: Wp(8),
                  overflow: 'hidden',
                  width: wp(85),
                  marginTop: Wp(20),
                  marginBottom: Wp(5),
                  borderColor: InputBoxBorders,
                  borderWidth: 2,
                },
                IsTablet && {
                  width: wp(70),
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
                onChangeText={(text) => setUser({ ...User, email: text })}
                accessibilityLabelledBy={undefined}
                accessibilityLanguage={undefined}
              />
            </View>
            <View
              style={[
                {
                  borderRadius: Wp(8),
                  overflow: 'hidden',
                  width: wp(85),
                  marginVertical: Wp(10),
                  borderColor: InputBoxBorders,
                  borderWidth: 2,
                },
                IsTablet && {
                  width: wp(70),
                },
              ]}
            >
              <TextInput
                mode="flat"
                label="Password"
                placeholder="Enter Your Password"
                underlineColor={'#EFF3F2'}
                placeholderTextColor={colorWithOpacity(Colors.primary, 0.6)}
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
                secureTextEntry={pass.Pass}
                right={
                  <TextInput.Icon
                    icon={pass.icon}
                    onPress={showPass}
                    accessibilityLabelledBy={undefined}
                    accessibilityLanguage={undefined}
                    size={IsTablet ? Wp(12) : undefined}
                  />
                }
                onChangeText={(text) => setUser({ ...User, password: text })}
                accessibilityLabelledBy={undefined}
                accessibilityLanguage={undefined}
              />
            </View>
            <LoginBtn HandleLogin={HandleLogin} Validation={validation} />

            <Text
              style={[styles.ForgetPassCont, IsTablet && { fontSize: s(10) }]}
              onPress={() => {
                navigation.navigate('Auth_ResetPass');
              }}
            >
              Forgot Password?
            </Text>
            <View>
              <Pressable
                style={[styles.Signupbtn, IsTablet && styles.SignupbtnTablet]}
                onPress={() => {
                  navigation.navigate('SIGN-UP-SCREEN');
                }}
              >
                <Text
                  style={[styles.btnText, IsTablet && styles.btnText_tablet]}
                >
                  Don’t have account? Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Signupbtn: {
    backgroundColor: Colors.light,
    width: wp(85),
    paddingVertical: Wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Wp(16),
    marginTop: Wp(20),
    height: Wp(56),
  },
  btnText: {
    fontFamily: Fonts.Nunito[400],
    fontSize: Wp(16),
    color: Colors.primary,
  },
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  FirstCont: {
    height: hp(38),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondCont: {
    height: hp(56),
    paddingHorizontal: Wp(16),
    paddingBottom: Hp(20),
  },
  InputBox: {
    backgroundColor: Colors.secondary,
    color: Colors.white,
    borderRadius: Wp(40),
    paddingHorizontal: Wp(25),
    paddingBottom: Wp(8),
    marginBottom: Hp(20),
  },
  ForgetPassCont: {
    textAlign: 'center',
    fontSize: s(14),
    fontFamily: Fonts.Nunito[700],
    color: Colors.primary,
    marginTop: Wp(15),
  },

  MainTitle: {
    fontFamily: Fonts.Nunito[800],
    fontSize: s(22),
    color: Colors.primary,
    textAlign: 'center',
  },
  MainSubtitle: {
    fontFamily: Fonts.Nunito[700],
    fontSize: s(12),
    color: Colors.primary,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: Wp(10),
  },
  MainTextCont: {
    marginBottom: Wp(20),
  },
  Errorbox: {
    height: Hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Errortext: {
    color: Colors.error,
    fontFamily: Fonts.Nunito[700],
    fontSize: s(10),
    textAlign: 'center',
  },
  SignupbtnTablet: {
    width: wp(70),
    height: Hp(45),
    borderRadius: Wp(10),
    paddingVertical: Wp(0),
  },
  btnText_tablet: {
    fontSize: s(10),
  },
});

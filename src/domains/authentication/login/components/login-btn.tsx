import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import useLoginStore from '../hooks/use-login-store';
import { Hp, IsPhone, IsTablet, Wp, wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';

interface Props {
  HandleLogin: () => void;
  Validation: { state: boolean; error: string };
}

const LoginBtn = ({ HandleLogin, Validation }: Props) => {
  //TODO:  State Types Redux needed to be added

  const { Success, loading, error } = useLoginStore();
  // this is whole animation of the Login Button
  const LoginTextAnimation = useRef(new Animated.Value(0)).current;
  const LoginIndicator = useRef(new Animated.Value(Wp(200))).current;
  const LoginAnimation = () => {
    Animated.timing(LoginTextAnimation, {
      toValue: Wp(-200),
      duration: 700,

      useNativeDriver: false,
    }).start();
    Animated.timing(LoginIndicator, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }; // this function will be called when the user is logged in and the Login Button will be animated
  const Not_Able_To_Login = () => {
    Animated.timing(LoginTextAnimation, {
      toValue: Wp(0),
      duration: 700,
      useNativeDriver: false,
    }).start();
    Animated.timing(LoginIndicator, {
      toValue: Wp(200),
      duration: 700,
      useNativeDriver: false,
    }).start();
  }; // this function will be called when the user is not logged in for not providing proper value and the Login Button will be animated

  useEffect(() => {
    if (
      (Success == false && loading == false && error.status == true) ||
      Validation.state == true
    ) {
      Not_Able_To_Login();
    }
  }, [Success, loading, error, Validation]);

  return (
    <TouchableOpacity
      onPress={() => {
        LoginAnimation();
        setTimeout(() => {
          HandleLogin();
        }, 1000);
      }}
    >
      <View
        style={[
          styles.btn,
          IsTablet && {
            width: wp(70),
            height: Hp(38),
            borderRadius: Wp(10),
          },
        ]}
      >
        <View style={styles.btnCont}>
          <Animated.Text
            style={[
              styles.btnText,
              {
                transform: [{ translateX: LoginTextAnimation }],
                position: 'absolute',
              },
              IsTablet && {
                fontSize: s(12),
              },
            ]}
          >
            Login
          </Animated.Text>
          <Animated.View
            style={{ transform: [{ translateX: LoginIndicator }] }}
          >
            <ActivityIndicator
              color="#fff"
              size={IsPhone ? 'small' : 'large'}
            />
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LoginBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    width: wp(85),
    paddingVertical: Wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Wp(12),
    marginTop: Wp(20),

    height: Wp(43),
  },
  btnText: {
    color: '#fff',
    fontFamily: Fonts.Nunito[700],
    fontSize: s(16),
  },
  btnCont: {
    height: Wp(25),

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

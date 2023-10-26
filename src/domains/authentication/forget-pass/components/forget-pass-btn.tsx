import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@app/constants';
import { Hp, Wp, Nunito, IsTablet, wp } from '@app/utils';

import { ActivityIndicator } from 'react-native-paper';
import { useForgetPass } from '../hooks/use-forget-pass';

/**
 * @author Muaaz Bin Sarfraz
 * @description This is a Animated Login Button that can be used in any screen
 * @param {Function} HandleFunc This is a function that will be called when the user clicks on the Button
 * @param {String} ReducerAction This is a Reducer Action that will be used to get the state , it must be same as the Reducer Action that is used in the Reducer as well as should have error:{status:boolean , message:string}, loading:boolean and Success:boolean State
 * @param {String} Text This is a Text that will be shown on the Button
 *
 * @example <AnimatedLoginBtn HandleFunc={()=>{}} ReducerAction="auth" Text="Login" />
 */

interface Props {
  HandleFunc: () => void;

  Text: string;
}
const ForgetPassBtn = ({ HandleFunc, Text }: Props) => {
  // const { loading, Success, error } = useSelector(
  //   (state: any) => state[ReducerAction]
  // ); // consist of State that tells Weather the user is logged in or not , have a loading state and a error state and a success state

  const { Success, loading, error } = useForgetPass();
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
    if (Success == false && loading == false && error.status == true) {
      Not_Able_To_Login();
    }
  }, [Success, loading, error]);

  return (
    <TouchableOpacity
      onPress={() => {
        LoginAnimation();
        setTimeout(() => {
          HandleFunc();
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
            marginVertical: Wp(5),
          },
        ]}
      >
        <View style={[styles.btnCont]}>
          <Animated.Text
            style={[
              styles.btnText,
              {
                transform: [{ translateX: LoginTextAnimation }],
                position: 'absolute',
              },
              IsTablet && {
                fontSize: Wp(12),
              },
            ]}
          >
            {Text}
          </Animated.Text>
          <Animated.View
            style={{ transform: [{ translateX: LoginIndicator }] }}
          >
            <ActivityIndicator
              color="#fff"
              size={IsTablet ? 'large' : 'small'}
            />
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ForgetPassBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    width: wp(85),
    paddingVertical: Wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Wp(12),

    height: Wp(43),
    marginVertical: Wp(20),
  },
  btnText: {
    color: '#fff',
    fontFamily: Nunito(700),
    fontSize: Wp(16),
  },
  btnCont: {
    height: Wp(25),

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

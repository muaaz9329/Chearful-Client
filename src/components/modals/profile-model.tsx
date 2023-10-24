import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationHelpers } from '@react-navigation/native';
import ModelLayout from '../modal-layout';
import { Mulish, Wp } from '@app/utils';
import { Colors } from '@app/constants';

const ProfileModel = ({
  visible = true,
  setVisible,
  navigation,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation?: NavigationHelpers<any, any>;
}) => {
  return (
    <ModelLayout visible={visible} setVisible={setVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#ff941b',
            padding: Wp(18),
            borderRadius: Wp(14),
            marginVertical: Wp(10),
          }}
          onPress={() => {
            //  Platform.OS =='android' ?  LinkingText("https://chearful.com/client-signup") :
            //  InAppBrowser.open("https://chearful.com/client-signup")

            navigation?.navigate('AUTH-MODULE', {
              screen: 'SIGN-UP-SCREEN',
            });
            setVisible(false);
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: Wp(20),
              fontFamily: Mulish(600),
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: Wp(18),
            paddingHorizontal: Wp(24),
            borderRadius: Wp(14),
            marginVertical: Wp(10),
          }}
          onPress={() => {
            // Platform.OS =='android' ?  LinkingText("https://chearful.com/sign-in") :
            // InAppBrowser.open("https://chearful.com/sign-in")
            // setVisible(false)

            navigation?.navigate('AUTH-MODULE', {
              screen: 'LOGIN-SCREEN',
            });
            setVisible(false);
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: Wp(20),
              fontFamily: Mulish(600),
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ModelLayout>
  );
};

export default ProfileModel;

const styles = StyleSheet.create({});

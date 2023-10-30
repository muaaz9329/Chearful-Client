import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ModelLayout from '../modal-layout';

import { Mulish, Wp, IsTablet } from '@app/utils';
import { Colors } from '@app/constants';

import { colorWithOpacity } from '@app/utils';

import { IconDoor, IconUserPlus } from 'tabler-icons-react-native';
import { NavigationHelpers } from '@react-navigation/native';
import { AppNavigator } from '@app/navigation/app-navigation';
import { AuthNavigator } from '@app/domains/authentication';

const SignUpModel = ({
  navigation,
  setVisible,
  visible,
}: {
  navigation: NavigationHelpers<any, any>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ModelLayout
      visible={visible}
      setVisible={setVisible}
      MobileHeight={190}
      TabletHeight={105}
    >
      <View style={[styles.cont, IsTablet && styles.cont_tablet]}>
        <TouchableOpacity
          style={[styles.Row]}
          onPress={() => {
            navigation?.navigate(AppNavigator.Auth, {
              screen: AuthNavigator.SignUp,
            });
            setVisible(false);
          }}
        >
          <View style={[styles.SvgImg, IsTablet && styles.SvgImg_tablet]}>
            {/* <SvgUri
            uri={"https://d17thj9kqp1mkn.cloudfront.net/chearful/assets/client_dashborad_assets/imgs/psychology1-m.svg"}
            height={IsTablet?Wp(30):Wp(50)}
            width={IsTablet?Wp(30):Wp(50)}
            /> */}
            <IconUserPlus
              height={IsTablet ? Wp(30) : Wp(40)}
              width={IsTablet ? Wp(30) : Wp(40)}
              color={Colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, IsTablet && styles.title_tablet]}>
              Sign Up
            </Text>
            <Text style={[styles.Subtitle, IsTablet && styles.subTitle_tablet]}>
              Join the Chearful community
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Row]}
          onPress={() => {
            navigation?.navigate(AppNavigator.Auth, {
              screen: AuthNavigator.Login,
            });
            setVisible(false);
          }}
        >
          <View style={[styles.SvgImg, IsTablet && styles.SvgImg_tablet]}>
            <IconDoor
              height={IsTablet ? Wp(30) : Wp(40)}
              width={IsTablet ? Wp(30) : Wp(40)}
              color={Colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, IsTablet && styles.title_tablet]}>
              Login
            </Text>
            <Text style={[styles.Subtitle, IsTablet && styles.subTitle_tablet]}>
              Welcome back! Login to your account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModelLayout>
  );
};

export default SignUpModel;

const styles = StyleSheet.create({
  subTitle_tablet: {
    fontSize: Wp(8),
    width: Wp(140),
  },
  title_tablet: {
    fontSize: Wp(10),
    marginBottom: Wp(2),
  },
  SvgImg_tablet: {
    width: Wp(30),
    height: Wp(30),
    marginRight: Wp(5),
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colorWithOpacity(Colors.primary, 0.5),
  },
  cont_tablet: {
    padding: Wp(8),
  },
  cont: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Wp(20),
  },
  Subtitle: {
    fontSize: Wp(14),
    fontFamily: Mulish(500),
    color: colorWithOpacity(Colors.primary, 0.5),

    width: Wp(250),
  },
  title: {
    fontSize: Wp(16),
    fontFamily: Mulish(700),
    color: Colors.primary,
    marginBottom: Wp(5),
  },
  SvgImg: {
    width: Wp(45),
    height: Wp(45),
    marginRight: Wp(10),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

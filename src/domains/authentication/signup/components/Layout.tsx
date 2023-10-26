import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChearfulLogo } from '@app/assets/svgs/';
import { Colors } from '@app/constants';
import { IsPhone, Wp } from '@app/utils';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <View style={styles.HeaderLogo}>
        <ChearfulLogo
          height={IsPhone ? Wp(35) : Wp(20)}
          width={IsPhone ? Wp(150) : Wp(90)}
          color={Colors.primary}
        />
      </View>
      <View style={styles.SignUpForm}>{children}</View>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  HeaderLogo: {
    alignItems: 'center',
  },
  SignUpForm: {
    flex: 1,

    marginTop: Wp(20),
    justifyContent: 'space-between',
  },
});

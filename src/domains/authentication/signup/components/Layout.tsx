import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChearfulLogo } from "@app/svgs/Index";
import { AppColors } from "@app/constants/app-colors";
import { DeviceType } from "@app/context/Device-Type/DeviceTypeProvider";
import { Wp } from "@app/helper/CustomResponsive";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
type Props = {
  deviceType: DeviceType;
  children?: React.ReactNode;
};

const Layout = ({ deviceType, children }: Props) => {
  return (
    <>
      <View style={styles.HeaderLogo}>
        <ChearfulLogo
          height={deviceType === "mobile" ? Wp(35) : Wp(20)}
          width={deviceType === "mobile" ? Wp(150) : Wp(90)}
          color={AppColors.Primary}
        />
      </View>
      <View style={styles.SignUpForm}>{children}</View>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  HeaderLogo: {
    alignItems: "center",
  },
  SignUpForm: {
    flex: 1,

    marginTop: Wp(20),
    justifyContent: 'space-between'
  },
});

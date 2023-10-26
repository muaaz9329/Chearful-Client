//!this is temp screen will be remove in future

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "@app/assets/styles/global-styles";
import { ChearfulLogo, ChevronLeft } from "@app/svgs/Index";
import { AppColors } from "@app/constants/app-colors";
import { Wp, wp } from "@app/helper/CustomResponsive";
import { DeviceContext } from "@app/context/Device-Type/DeviceTypeProvider";
import HirePrac from "../../components/hire-prac";
import { Mulish, Nunito } from "@app/helper/FontWeight";
import { colorWithOpacity } from "@app/helper/customFunction";
import Header from "@app/common/components/Header";
import { useNavigation } from "@react-navigation/native";
import { IconComponent } from "@app/types";

const TempScreen = () => {
  const { deviceType } = useContext(DeviceContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[globalStyles.bodyWrapper]}>
      <Header
        navigation={navigation}
        Icon={ChevronLeft as IconComponent}
        pram="back"
      >
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <ChearfulLogo color={AppColors.Primary} width={110} height={50} />
        </View>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            marginTop: deviceType === "tablet" ? Wp(10) : Wp(20),
          },
          ,
          deviceType === "tablet" && { width: wp(82), alignSelf: "center" },
        ]}
      >
        <Text
          style={[
            globalStyles.fs_18,
            globalStyles.mulish_600,
            globalStyles.textPrimary,
            deviceType === "tablet" && globalStyles.fs_12,
            { textAlign: "center" },
          ]}
        >
          Connect with a credentialed & licensed practitioner to start your
          mental wellbeing journey!
        </Text>
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter]}>
          <HirePrac position="relative" />
        </View>
        <View
          style={[
            {
              marginTop: deviceType === "mobile" ? Wp(30) : Wp(15),

              alignItems: "center",
              borderRadius: Wp(16),
              overflow: "hidden",
              backgroundColor: "#BEE887",
              flexDirection: "row",
            },
            deviceType === "tablet" && {
              width: wp(70),
              alignSelf: "center",
              borderRadius: Wp(8),
            },
          ]}
        >
          <Image
            style={{
              width: deviceType === "mobile" ? Wp(100) : Wp(70),
              height: deviceType === "mobile" ? Wp(100) : Wp(55),
            }}
            source={require("../../imgs/temp.png")}
            resizeMode="cover"
          />

          <Text
            style={[
              {
                fontSize: deviceType === "mobile" ? Wp(22) : Wp(14),
                marginLeft: Wp(5),
              },
              globalStyles.nunito_800,
              globalStyles.textPrimary,
            ]}
          >
            How we can help you
          </Text>
        </View>

        <View
          style={{
            marginTop: deviceType == "tablet" ? Wp(15) : Wp(30),
          }}
        >
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              deviceType === "tablet" && globalStyles.fs_12,
            ]}
          >
            Availability
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              deviceType === "tablet" && globalStyles.fs_10,
              {
                color: colorWithOpacity(AppColors.Primary, 0.5),
              },
            ]}
          >
            Qualified & experienced practitioners who are multi-cultural,
            multi-lingual and ready to support you
          </Text>
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              deviceType === "tablet" && globalStyles.fs_12,
            ]}
          >
            Affordability
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              deviceType === "tablet" && globalStyles.fs_10,
              {
                color: colorWithOpacity(AppColors.Primary, 0.5),
              },
            ]}
          >
            In showcasing every practitioner’s choice of fees, we give you a
            greater chance to seek mental health services within your financial
            means
          </Text>
          <Text
            style={[
              globalStyles.nunito_700,
              globalStyles.fs_18,
              globalStyles.textPrimary,
              globalStyles.mt_12,
              globalStyles.mb_12,
              deviceType === "tablet" && globalStyles.fs_12,
            ]}
          >
            Privacy
          </Text>
          <Text
            style={[
              globalStyles.mulish_400,
              globalStyles.fs_16,
              deviceType === "tablet" && globalStyles.fs_10,
              {
                color: colorWithOpacity(AppColors.Primary, 0.5),
              },
            ]}
          >
            The added sense of confidentiality and safety, enabling you to
            connect from anywhere, without compromising your privacy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TempScreen;

const styles = StyleSheet.create({});

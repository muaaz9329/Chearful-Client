import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ModelLayout from "@app/common/Models/Model-Layout";
import globalStyles, {
  globalStylesFunc,
} from "@app/assets/styles/global-styles";
import { AppText, Heading, MyButton } from "@app/common/components";
import { IconX } from "tabler-icons-react-native";
import { Wp } from "@app/helper/CustomResponsive";
import {
  DeviceContext,
  DeviceType,
} from "../../../../context/Device-Type/DeviceTypeProvider";
import { AppColors } from "@app/constants";
import { NavigationHelpers } from "@react-navigation/native";

const ThirtyXThirtyModel = ({
  navigation,
  visible = true,
  setVisible,
}: {
  navigation: NavigationHelpers<any, any>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deviceType } = useContext(DeviceContext);

  const hideModel = () => {
    setVisible(false);
  };
  return (
    <ModelLayout
      visible={visible}
      setVisible={setVisible}
      DeviceType={deviceType}
    >
      <View style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
        <Heading size="lg">Join Challenge</Heading>
        <Pressable
          style={[
            globalStyles.px_10,
            globalStyles.py_10,
            globalStyles.bg_cont,
            globalStylesFunc.br(12),
          ]}
          onPress={hideModel}
        >
          <IconX size={Wp(20)} color={AppColors.Primary} />
        </Pressable>
      </View>
      <Image
        source={require("../../imgs/model-img.png")}
        style={[
          {
            width: "100%",
            height: "50%",
            resizeMode: "contain",
            marginTop: Wp(15),
          },
        ]}
      />
      <View>
        <AppText
          size="lg"
          style={[globalStyles.textCenter, globalStyles.mt_10]}
        >
          Dubai’s 30 Day Mental Fitness Challenge
        </AppText>
      </View>

      <MyButton
        textStyles={{
          fontSize: Wp(16),
        }}
        title="Join Now"
        style={[
          globalStyles.alignSelfCenter,
          globalStyles.mt_15,
          globalStylesFunc.br(10),
          globalStyles.px_15,
          globalStyles.py_10,
        ]}
        onPress={() => {
          //! navigation set to thirty x thirty module
          navigation.navigate("THIRTY-X-THIRTY-MODULE", {
            screen: "LANDING-SCREEN",
          });

          hideModel();
        }}
      />
    </ModelLayout>
  );
};

export default ThirtyXThirtyModel;

const styles = StyleSheet.create({});

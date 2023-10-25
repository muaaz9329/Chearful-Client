import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import BouncyCheckBox from "@app/common/components/CheckBox/Bouncy-CheckBox";
import { LinkingText } from "@app/helper/customFunction";
import { Wp } from "@app/helper/CustomResponsive";
import { Mulish } from "@app/helper/FontWeight";
import { AppColors } from "@app/constants/app-colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { DeviceType } from "@app/context/Device-Type/DeviceTypeProvider";

type Props = {};

const LisenseAndAgreement = ({
  handleFunc,
  deviceType = "mobile",
}: {
  handleFunc: (text: string, name: string) => void;
  deviceType?: DeviceType;
}) => {
  const [check, setCheck] = React.useState(false);
  useEffect(() => {
    if (check) {
      handleFunc("1", "lisenseAgreement");
    } else {
      handleFunc("0", "lisenseAgreement");
    }
  }, [check]);
  return (
    <BouncyCheckBox setCheck={setCheck} DeviceType={deviceType}>
      <View>
        <Text
          style={[
            styles.AgreementText,
            deviceType === "tablet" && {
              fontSize: Wp(8),
              width: widthPercentageToDP(60),
            },
          ]}
        >
          Agree To Chearful's{" "}
          <Text
            style={styles.linkingText}
            onPress={() => {
              LinkingText("https://chearful.com/policies");
            }}
          >
            Terms & Conditions, Privacy Policy{" "}
          </Text>{" "}
          and{" "}
          <Text
            style={styles.linkingText}
            onPress={() => {
              LinkingText("https://chearful.com/counseling-agreement");
            }}
          >
            {" "}
            Chearful Client Agreement
          </Text>{" "}
        </Text>
      </View>
    </BouncyCheckBox>
  );
};

export default LisenseAndAgreement;

const styles = StyleSheet.create({
  AgreementText: {
    fontSize: Wp(14),
    fontFamily: Mulish(400),
    color: AppColors.MenuText,
    width: widthPercentageToDP(80),

    marginLeft: Wp(10),
  },
  linkingText: {
    color: AppColors.Primary,
    textDecorationLine: "underline",
  },
});

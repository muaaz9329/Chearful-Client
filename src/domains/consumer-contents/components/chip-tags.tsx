import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DeviceType } from "@app/context/Device-Type/DeviceTypeProvider";
import { Wp } from "@app/helper/CustomResponsive";
import { AppColors } from "@app/constants/app-colors";
import { Mulish } from "@app/helper/FontWeight";

const ChipTags = ({
  value,
  deviceType = "tablet",
}: {
  value: string;
  deviceType?: DeviceType;
}) => {
  return (
    <View
      style={[
        styles.ChipCont,
        deviceType === "tablet" && styles.ChipCont_tablet,
      ]}
    >
      <Text
        style={[
          styles.chipTextStyles,
          deviceType === "tablet" && styles.chipTextStyles_tablet,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default ChipTags;

const styles = StyleSheet.create({
  chipTextStyles_tablet: {
    fontSize: Wp(8),
  },
  ChipCont_tablet: {
    paddingVertical: Wp(4),
    paddingHorizontal: Wp(6),
    marginRight: Wp(5),
    marginBottom: Wp(3.5),
  },
  chipTextStyles: {
    fontFamily: Mulish(700),
    fontSize: Wp(14),
    color: AppColors.Primary,
  },
  ChipCont: {
    paddingVertical: Wp(6),
    paddingHorizontal: Wp(10),
    borderRadius: Wp(70),
    backgroundColor: "#F2F2F2",
    marginRight: Wp(8),
    marginBottom: Wp(5),
  },
});

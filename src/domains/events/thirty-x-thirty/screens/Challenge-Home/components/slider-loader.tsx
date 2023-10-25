import { StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles, {
  globalStylesFunc as ms,
} from "@app/assets/styles/global-styles";
import { IsTablet } from "@app/constants";
import { mergeStyles } from "@app/helper/customFunction";

const SlideLoader = ({
  percentage,
  bgColor = "#F17668",
  loaderColor = "#ffffff",
  height = 6,
}: {
  percentage: number;
  bgColor?: string;
  loaderColor?: string;
  height?: number;
}) => {
  return (
    <View
      style={[
        globalStyles.mt_10,

        ms.br(10),
        IsTablet && mergeStyles(ms.br(8), ms.mt(7)),
        ms.bg(bgColor),
        {
          width: "100%",
        },
      ]}
    >
      <View
        style={[
          ms.py(height),
          ms.br(10),
          IsTablet && mergeStyles(ms.py(height*0.667), ms.br(8)),
          ms.bg(loaderColor),
          {
            width: `${percentage}%`,
          },
        ]}
      ></View>
    </View>
  );
};

export default SlideLoader;

const styles = StyleSheet.create({});

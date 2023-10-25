import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Wp } from "@app/helper/CustomResponsive";
import { ModuleImg } from "../../../assets";
import Heading from "@app/common/components/heading";
import globalStyles, {
  globalStylesFunc,
} from "@app/assets/styles/global-styles";
import { Dot } from "@app/svgs/Index";
import { IsTablet } from "@app/constants";
import { mergeStyles } from "@app/helper/customFunction";

type Props = {};

const Banner = (props: Props) => {
  return (
    <View
      style={[
        styles.Cont,
        IsTablet && {
          height: Wp(100),
          borderRadius: Wp(10),
        },
      ]}
    >
      <View
        style={[
          styles.TextCont,
          IsTablet && { width: "100%", height: Wp(100) },
        ]}
      >
        <Heading
          size={"lg"}
          style={[
            globalStyles.textCenter,
            globalStyles.nunito_800,
            globalStyles.mb_10,
            IsTablet &&
              mergeStyles(globalStylesFunc.fs(22), globalStyles.mb_10),
          ]}
        >
          WIN-VICTORY-LOVE
        </Heading>
        {[
          "Win over Mental Fatigue",
          "find Victory in Your Challenges",
          "Love Yourself & Others",
        ].map((item, index) => {
          return (
            <Heading
              key={index}
              size="sm"
              style={[
                globalStyles.textCenter,
                globalStyles.mulish_600,
                globalStyles.mb_8,
                IsTablet &&
                  mergeStyles(
                    globalStylesFunc.fs(10),
                    globalStylesFunc.mb(4),
                    globalStyles.mulish_700
                  ),
              ]}
            >
              {item}
            </Heading>
          );
        })}
      </View>

      <View style={styles.imgCont}>
        <Image
          source={ModuleImg.bannerImg2}
          style={{
            width: IsTablet ? Wp(90) : Wp(177),
            height: IsTablet ? Wp(70) : Wp(127),
            resizeMode: "contain",
          }}
        />
        <Image
          source={ModuleImg.bannerImg1}
          style={{
            width: IsTablet ? Wp(80) : Wp(130),
            height: IsTablet ? Wp(80) : Wp(130),
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  imgCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: Wp(-10),
  },
  TextCont: {
    width: "100%",
    height: Wp(230),
    position: "absolute",
    paddingTop: Wp(10),
  },
  Cont: {
    width: "100%",
    height: Wp(230),
    position: "relative",
    backgroundColor: "rgba(244, 164, 23, 0.5)",
    flexDirection: "column-reverse",
    overflow: "hidden",
  },
});

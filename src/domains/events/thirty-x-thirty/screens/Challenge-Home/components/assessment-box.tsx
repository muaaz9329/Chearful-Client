import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles, {
  globalStylesFunc,
} from "@app/assets/styles/global-styles";
import { IsTablet } from "@app/constants";
import {
  colorWithOpacity as ColorWithopacity,
  mergeStyles,
} from "@app/helper/customFunction";
import AppText from "@app/common/components/app-text";
import Heading from "@app/common/components/heading";
import Loader from "./slider-loader";

const assessmentColors = {
  upcoming: "#FFDE6B",
  level1: "#FCB2AA",
  level2: "#F9A49A",
  level3: "#F69388",
  level4: "#F48477",
  level5: "#F17668",
};

const assessmentStrings = {
  upcoming: "Assessment",
  level1: "Level - 01",
  level2: "Level - 02",
  level3: "Level - 03",
  level4: "Level - 04",
  level5: "Level - 05",
};

const assessmentPercentage = {
  upcoming: 0,
  level1: 20,
  level2: 40,
  level3: 60,
  level4: 80,
  level5: 100,
};

const AssessmentBox = ({
  conditon = "level2",
  onPress,
}: {
  conditon: "upcoming" | "level1" | "level2" | "level3" | "level4" | "level5";
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!(conditon === "upcoming")}
      style={[
        globalStylesFunc.W(140),
        globalStylesFunc.H(140),
        globalStylesFunc.br(12),

        globalStyles.flexColumn,
        globalStyles.py_10,

        globalStyles.px_10,
        IsTablet &&
          mergeStyles(
            globalStylesFunc.W(90),
            globalStylesFunc.H(90),
            globalStylesFunc.br(10),
            globalStylesFunc.px(8),

            globalStylesFunc.py(8)
          ),

        globalStylesFunc.bg(assessmentColors[conditon]),
        conditon === "upcoming" &&
          mergeStyles(globalStyles.justifyCenter, globalStyles.alignCenter),
      ]}
    >
      <View style={conditon != "upcoming" && styles.notUpcomingCont}>
        <Heading
          size="sm"
          style={[
            globalStylesFunc.px(8),
            globalStyles.textCenter,
            globalStylesFunc.text(ColorWithopacity("#000", 0.5)),
            globalStyles.nunito_600,
          ]}
        >
          {conditon === "upcoming" ? "Assessment Day" : "Assessment Result"}
        </Heading>
        {conditon !== "upcoming" && (
          <View>
            <Heading
              size="sm"
              style={[
                globalStylesFunc.px(8),
                globalStylesFunc.text(ColorWithopacity("#000", 0.5)),
                globalStyles.textCenter,
              ]}
            >
              {assessmentStrings[conditon]}
            </Heading>

            <View>
              <Loader percentage={assessmentPercentage[conditon]} />
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default AssessmentBox;

const styles = StyleSheet.create({
  notUpcomingCont: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
});

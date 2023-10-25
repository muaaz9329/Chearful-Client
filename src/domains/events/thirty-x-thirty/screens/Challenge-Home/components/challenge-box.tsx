import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import globalStyles, {
  globalStylesFunc,
} from "@app/assets/styles/global-styles";
import { AppColors, IsTablet } from "@app/constants";
import { colorWithOpacity, mergeStyles } from "@app/helper/customFunction";
import Heading from "@app/common/components/heading";
import AppText from "@app/common/components/app-text";
import { IconCheck, IconLock, IconX } from "tabler-icons-react-native";
import { Wp } from "@app/helper/CustomResponsive";
import { useChallengeStore } from "../hooks/use-challenge-store";

const ChallengeBox = ({
  condition = "completed",
  title = "Write Down Three Things",
  handleNavigaiton,
  index,
  questionId,
  assessmentId,
}: {
  condition: "completed" | "missed" | "current" | "upcoming";
  title: string;
  handleNavigaiton: (questionId: number, assessmentId: number) => void;
  index?: number;
  questionId?: number;
  assessmentId?: number;
}) => {
  const { setCurrentChallenge } = useChallengeStore();

 
  return (
    <Pressable
      disabled={!(condition ==='current')}
      style={[
        globalStylesFunc.W(140),
        globalStylesFunc.H(140),
        globalStylesFunc.br(12),
        globalStylesFunc.bw(2.5),
        globalStyles.flexColumn,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        globalStyles.px_10,
        globalStyles.mt_15,
        IsTablet &&
          mergeStyles(
            globalStylesFunc.W(90),
            globalStylesFunc.H(90),
            globalStylesFunc.br(10),
            globalStylesFunc.mt(10)
          ),
        (condition === "upcoming" || condition === "missed") &&
          mergeStyles(globalStylesFunc.bg("#F2F2F2"), globalStylesFunc.bw(0)),
        condition === "completed" &&
          mergeStyles(
            globalStylesFunc.bg(colorWithOpacity("#6DB27D", 0.3)),
            globalStylesFunc.bw(0)
          ),
      ]}
      onPress={() => {
        handleNavigaiton(questionId as number, assessmentId as number); //! Temporary
        setCurrentChallenge(index as number);
      }}
    >
      <View
        style={[
          globalStylesFunc.W(140),
          globalStylesFunc.H(140),

          IsTablet &&
            mergeStyles(globalStylesFunc.W(90), globalStylesFunc.H(90)),
          styles.absoluteCont,
          (condition === "upcoming" || condition === "missed") &&
            styles.UpcomingContAbsolute,
        ]}
      ></View>
      <View
        style={[
          globalStylesFunc.W(40),
          globalStylesFunc.H(40),
          globalStylesFunc.br(25),
          globalStylesFunc.bg("#EAEAEA"),
          styles.Badge,
          globalStyles.justifyCenter,
          globalStyles.alignCenter,
          IsTablet &&
            mergeStyles(globalStylesFunc.W(25), globalStylesFunc.H(25)),
        ]}
      >
        {condition === "missed" ? (
          <IconX size={IsTablet ? Wp(10) : Wp(20)} color={AppColors.Error} />
        ) : condition === "completed" ? (
          <IconCheck
            size={IsTablet ? Wp(10) : Wp(20)}
            color={AppColors.Primary}
          />
        ) : (
          <AppText size="md" style={[globalStyles.mulish_700]}>
            {index}
          </AppText>
        )}
      </View>

      {(condition === "upcoming" || condition === "missed") && (
        <IconLock
          size={IsTablet ? Wp(20) : Wp(30)}
          color={AppColors.Primary}
          style={{ marginBottom: Wp(8) }}
        />
      )}

      <Heading size="sm" style={globalStyles.textCenter}>
        {title}
      </Heading>
    </Pressable>
  );
};

export default ChallengeBox;

const styles = StyleSheet.create({
  absoluteCont: {
    position: "absolute",
    zIndex: -10,
  },
  UpcomingContAbsolute: {
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 1,
  },
  Badge: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
  },
});

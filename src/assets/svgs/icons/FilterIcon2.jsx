import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg, Path, G, Rect, ClipPath, Defs } from "react-native-svg";
const FilterIcon2 = ({ width, height, color }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_8606_166157)">
        <Path
          d="M2.5 3.3335H17.5V5.00016H2.5V3.3335ZM4.16667 15.8335H15.8333V17.5002H4.16667V15.8335ZM2.5 11.6668H17.5V13.3335H2.5V11.6668ZM4.16667 7.50016H15.8333V9.16683H4.16667V7.50016Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8606_166157">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default FilterIcon2;

const styles = StyleSheet.create({});

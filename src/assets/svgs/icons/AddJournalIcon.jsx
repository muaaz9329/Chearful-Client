import React from "react";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";
const AddJournalIcon = ({ width, height, color }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        opacity="0.7"
        d="M2.68232 35.9117C0.242672 27.5727 1.65376 20.2924 5.51567 14.5404C9.3932 8.76523 15.7912 4.46149 23.4189 2.22996C38.4143 -2.15706 54.6616 7.68713 59.5739 24.478C62.0216 32.8448 60.9155 40.4425 57.3545 46.4922C53.7877 52.5517 47.7178 57.1248 40.1284 59.3452C25.1501 63.7272 7.60022 52.7217 2.68232 35.9117Z"
        stroke={color}
        stroke-width="2"
      />
      <G clip-path="url(#clip0_0_5)">
        <Path
          d="M31 24V38"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M24 31H38"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_5">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(19 19)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AddJournalIcon;

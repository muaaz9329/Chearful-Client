import React from "react";
import { Svg, Circle, Path, G, Rect, ClipPath, Defs } from "react-native-svg";
const TickIcon = ({ width, height, Bgcolor, TickColor }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="12" cy="12" r="12" fill={Bgcolor} />
      <G clip-path="url(#clip0_0_5)">
        <Path
          d="M6.75 12L10.5 15.75L18 8.25"
          stroke={TickColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_5">
          <Rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TickIcon;

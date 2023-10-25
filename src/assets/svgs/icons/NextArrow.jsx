import React from "react";
import { Svg, Path } from "react-native-svg";

const NextArrow = ({ color, height, width }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 75 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        opacity="0.7"
        d="M8.68232 42.9117C6.24267 34.5727 7.65376 27.2924 11.5157 21.5404C15.3932 15.7652 21.7912 11.4615 29.4189 9.22996C44.4143 4.84294 60.6616 14.6871 65.5739 31.478C68.0216 39.8448 66.9155 47.4425 63.3545 53.4922C59.7877 59.5517 53.7178 64.1248 46.1284 66.3452C31.1501 70.7272 13.6002 59.7217 8.68232 42.9117Z"
        stroke={color}
        stroke-width="2"
      />
      <Path
        d="M39.6104 34.2863L43.3604 38.0363M43.3604 38.0363L39.6104 41.7863M43.3604 38.0363H25.3604"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default NextArrow;

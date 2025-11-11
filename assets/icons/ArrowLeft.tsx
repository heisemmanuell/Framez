import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
};

const ArrowLeft = ({
  width = 24,
  height = 24,
  strokeWidth = 2,
  color = "currentColor",
  ...props
}: IconProps) => (
  <Svg viewBox="0 0 24 24" width={width} height={height} fill="none" {...props}>
    <Path
      d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeft;

import React from "react";
import Svg, { Path } from "react-native-svg";

const More = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M11.9959 12H12.0049"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.9998 12H18.0088"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.99981 12H6.00879"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default More;

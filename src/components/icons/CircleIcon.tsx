import type { IconProps } from "@/types/icon";
import React from "react";

const CircleIcon: React.FC<IconProps> = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className={style}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export default CircleIcon;

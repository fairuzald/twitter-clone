import React from "react";

interface ButtonProps {
  children: string;
  color: "blue" | "white" | "trans-blue";
  onClick?: React.FormEventHandler<HTMLFormElement> | (() => void);
  disabled?: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  onClick,
  disabled,
  onMouseEnter,
  onMouseLeave,
}) => {
  const colorEffect = {
    blue: "bg-twitter-blue text-twitter-white hover:bg-twitter-blue-hover disabled:bg-twitter-blue-disabled",
    white: "bg-white text-black hover:bg-twitter-white disabled:bg-[#DCDEDF]",
    "trans-blue":
      "bg-transparent text-twitter-blue disabled:bg-[#A3EDF7] hover:bg-[#031018] border-twitter-light-gray border-[1px]",
  };
  return (
    <button
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${colorEffect[color]} flex w-full items-center justify-center gap-4 rounded-full px-5 py-2 text-base transition duration-300 `}
    >
      <p className="block text-base font-bold">{children}</p>
    </button>
  );
};

export default Button;

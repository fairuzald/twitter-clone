import React from "react";

interface ButtonProps {
  children: string;
  color: "blue" | "white" | "trans-blue";
  onClick?: React.FormEventHandler<HTMLFormElement> | (() => void);
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  onClick,
  disabled,
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
      className={`${colorEffect[color]} flex w-full text-base items-center justify-center gap-4 rounded-full px-5 py-2 transition duration-300 `}
    >
      <p className="text-base block font-bold">{children}</p>
    </button>
  );
};

export default Button;

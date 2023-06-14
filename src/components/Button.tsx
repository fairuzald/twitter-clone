import React from "react";
interface ButtonProps {
  children: string;
  color: "blue" | "white" | "trans-blue";
  onClick: () => void;
  disabled?:boolean
}

const Button: React.FC<ButtonProps> = ({ children, color, onClick, disabled }) => {
  const ColorEffect = {
    blue: "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8] disabled:bg-[#A3EDF7]",
    white: "bg-white text-black hover:bg-twitter-white disabled:bg-[#DCDEDF]",
    "trans-blue":
      "bg-transparent text-[#1A8CD8] disabled:bg-[#A3EDF7] hover:bg-[#031018] border-twitter-light-gray border-[1px]",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${ColorEffect[color]} flex w-full items-center justify-center gap-4 rounded-full px-5 py-2 transition duration-300 `}
    >
      <h3 className="hidden text-xl lg:block">{children}</h3>
    </button>
  );
};

export default Button;

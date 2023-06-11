import React from 'react'
interface ButtonProps{
    children: string;
    color: "blue" | "white"
    onClick: () => void;
}

const Button:React.FC<ButtonProps> = ({children,color, onClick}) => {
    const ColorEffect = {
        "blue" : "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]",
        "white" : "bg-white text-black hover:bg-twitter-white"
    }
  return (
    <button onClick={onClick} className={`${ColorEffect[color]} my-2 flex w-full items-center justify-center gap-4 rounded-full  px-4 py-2.5 transition duration-300 `}>
    <h3 className="hidden text-xl lg:block">
      {children}
    </h3>
  </button>
  )
}

export default Button

import React, { useCallback } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import { useRouter } from "next/router";
interface HeaderProps {
  showArrowButton?: boolean;
  label?: string;
  body?: JSX.Element | React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ showArrowButton, label, body }) => {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);
  return (
    <div className="flex w-full items-center gap-3 lg:gap-5 px-3 lg:px-6 py-2 lg:py-3 border-b-[1px] border-twitter-border">
      {!body ? (
        <>
          {showArrowButton && (
            <button
              onClick={handleBack}
              className="rounded-full px-2 py-2 transition duration-300 hover:bg-[#181818]"
            >
              <ArrowIcon style="w-4 h-4 lg:w-5 lg:h-5 fill-white rotate-180" />
            </button>
          )}
          <h4 className="text-base lg:text-xl font-bold text-white">{label}</h4>
        </>
      ) : (
        body
      )}
    </div>
  );
};

export default Header;

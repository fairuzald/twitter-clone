import React, { useCallback } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import { useRouter } from "next/router";
interface HeaderProps {
  showArrowButton: boolean;
  label: string;
}
const Header: React.FC<HeaderProps> = ({ showArrowButton, label }) => {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);
  return (
    <div className="flex items-center gap-5 px-6 py-2">
      {showArrowButton && (
        <button
          onClick={handleBack}
          className="rounded-full px-2 py-2 transition duration-300 hover:bg-[#181818]"
        >
          <ArrowIcon style="w-5 h-5 fill-white rotate-180" />
        </button>
      )}
      <h4 className="text-xl text-white">{label}</h4>
    </div>
  );
};

export default Header;

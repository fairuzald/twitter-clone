import React, { useState, type Dispatch, type SetStateAction } from "react";
import SearchIcon from "./icons/SearchIcon";
import CircleCrossIcon from "./icons/CircleCrossIcon";

const SearchBar = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Handler for input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handler for input blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`w-full rounded-full border-[1px] ${
        isFocused ? "border-twitter-blue bg-transparent" : "border-twitter-light-gray bg-[#202327]"
      } flex items-center  px-8 focus:border-twitter-blue`}
    >
      <div className="flex w-full items-center justify-between gap-4 py-2">
        {/* Search Icon */}
        <SearchIcon
          style={`${
            isFocused ? "fill-twitter-blue" : "fill-twitter-light-gray"
          } h-6 w-6`}
        />
        {/* Input field */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full border-none bg-transparent outline-none"
          placeholder={placeholder}
        />
        {/* Close Icon */}
        {value && (
          <button onClick={() => setValue("")} className="m-0 h-fit w-fit p-0">
            <CircleCrossIcon style="fill-twitter-blue h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

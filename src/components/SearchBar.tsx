import React, { type Dispatch, type SetStateAction } from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <div className="w-full rounded-full border-[1px] border-twitter-blue flex items-center px-8">
      <div className="w-full flex gap-4 items-center py-2">

      <SearchIcon style="fill-white h-6 w-6"/>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="py-1 w-full bg-transparent outline-none border-none"
        placeholder={placeholder}
        />
        </div>
    </div>
  );
};

export default SearchBar;

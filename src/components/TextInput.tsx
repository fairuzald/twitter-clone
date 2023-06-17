import React, { type Dispatch, type SetStateAction } from "react";

interface TextInputProps {
  type?: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  required?: boolean;
  textarea?: boolean;
}
const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  placeholder,
  type,
  disabled,
  required,
  textarea,
}) => {
  return textarea ? (
    <div className="flex flex-1 rounded-lg border-none outline-none ">
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="peer h-full w-full text-sm lg:text-xl resize-none bg-transparent px-4 opacity-100 outline-none ring-0 disabled:opacity-80"
      />
    </div>
  ) : (
    <div className="flex w-full text-sm lg:text-base rounded-lg border-[1px] border-twitter-light-gray outline-none ">
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="my-2 w-full bg-transparent px-4 outline-none "
      />
    </div>
  );
};

export default TextInput;

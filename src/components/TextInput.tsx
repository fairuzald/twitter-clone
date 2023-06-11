import React, { type Dispatch, type SetStateAction } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  required: boolean;
}
const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  placeholder,
  type,
  disabled,
  required,
}) => {
  return (
    <div className="flex w-full rounded-lg border-[1px] outline-none border-x-twitter-light-gray ">
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

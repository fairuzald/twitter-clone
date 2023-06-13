import React, { type Dispatch, type SetStateAction, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import CameraIcon from "./icons/CameraIcon";
interface DropzoneProps {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  isBorder?: boolean;
  alt: string;
  size: "small" | "medium" | "large";
}

const AvatarUpload: React.FC<DropzoneProps> = ({
  url,
  setUrl,
  disabled,
  alt,
  isBorder,
  size,
}) => {
  const sizeStyle = {
    small: `h-10 w-10 ${isBorder && "border-[1px] border-slate-700"}`,
    medium: `h-24 w-24 ${isBorder && "border-[2px] border-black"}`,
    large: `w-32 h-32 ${isBorder && "border-[4px] border-black"}`,
  };
  const onDrop = useCallback(
    (file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setUrl(e.target.result);
      };
      reader.readAsDataURL(file[0]);
    },
    [setUrl]
  );
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      className={`overflow-hidden rounded-full object-cover ${sizeStyle[size]}`}
    >
      <Image
        src={url ? url : "/profile.png"}
        alt={alt}
        width={64}
        height={64}
        className="relative h-full w-full overflow-hidden rounded-full object-cover object-center"
      />
      <button
        {...getRootProps({
          className:
            "rounded-full p-2 bg-slate-600 bg-opacity-80 transition duration-300 absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform hover:bg-slate-700 hover:bg-opacity-50",
        })}
      >
        <input {...getInputProps()} />
        <CameraIcon style="w-5 h-5 mx-auto fill-white"></CameraIcon>
      </button>
    </div>
  );
};

export default AvatarUpload;

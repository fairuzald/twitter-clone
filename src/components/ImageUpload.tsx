import React, { type Dispatch, type SetStateAction, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import CameraIcon from "./icons/CameraIcon";
import CrossIcon from "./icons/CrossIcon";
interface DropzoneProps {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  alt: string;
}

const AvatarUpload: React.FC<DropzoneProps> = ({
  url,
  setUrl,
  disabled,
  alt,
}) => {
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
    <div className="w-full overflow-hidden object-cover object-center">
      <Image
        src={url ? url : ""}
        alt={alt}
        width={64}
        height={64}
        className="relative h-full w-full overflow-hidden bg-[#333639] object-cover object-center"
      />
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform gap-3">
        <button
          {...getRootProps({
            className: "rounded-full p-2 bg-slate-600 bg-opacity-80 transition duration-300 hover:bg-slate-700 hover:bg-opacity-50",
          })}
        >
          <input {...getInputProps()} />
          <CameraIcon style="w-5 h-5 mx-auto fill-white"></CameraIcon>
        </button>
        {url && (
          <button
            onClick={() => setUrl("")}
            className="rounded-full p-2 bg-slate-600 bg-opacity-80 transition duration-300 hover:bg-slate-700 hover:bg-opacity-50"
          >
            <CrossIcon style="w-5 h-5 mx-auto fill-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;

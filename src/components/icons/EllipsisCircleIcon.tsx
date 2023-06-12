import type { IconProps } from "@/types/icon";

const EllipsisCircleIcon: React.FC<IconProps> = ({ style }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <title>ionicons-v5-f</title>
      <circle cx="256" cy="256" r="26" />
      <circle cx="256" cy="346" r="26" />
      <circle cx="256" cy="166" r="26" />
      <path
        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
        className="miter fill-none stroke-black stroke-[32px]"
      />
    </svg>
  );
};
export default EllipsisCircleIcon;

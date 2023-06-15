import type { IconProps } from "@/types/icon";

const NotificationIcon: React.FC<IconProps> = ({ style }) => {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24.00 24.00"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
      stroke-width="0.792"
      className={style}

    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#ffffff"
        stroke-width="0.384"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V9.83095C18 11.2503 18.3857 12.6429 19.116 13.8599L19.6694 14.7823C20.0364 15.3941 20.22 15.7 20.2325 15.9497C20.252 16.3366 20.0463 16.6999 19.7045 16.8823C19.4839 17 19.1272 17 18.4138 17H5.5863C4.87286 17 4.51614 17 4.29549 16.8823C3.95374 16.6999 3.74803 16.3366 3.7675 15.9497C3.78006 15.7 3.96359 15.3941 4.33065 14.7823L4.88407 13.8599C5.61428 12.6429 6 11.2503 6 9.83098V8Z"
          fill="#ffffff"
          fill-opacity="1"
        ></path>{" "}
        <path
          d="M14.35 18C14.4328 18 14.5007 18.0673 14.493 18.1498C14.4484 18.6254 14.1923 19.0746 13.7678 19.4142C13.2989 19.7893 12.663 20 12 20C11.337 20 10.7011 19.7893 10.2322 19.4142C9.80772 19.0746 9.55165 18.6254 9.50702 18.1498C9.49928 18.0673 9.56716 18 9.65 18L12 18L14.35 18Z"
          fill="#ffffff"
        ></path>{" "}
      </g>
    </svg>
  );
};
export default NotificationIcon;

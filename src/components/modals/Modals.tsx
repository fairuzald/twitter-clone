import { useEffect, useState } from "react";

import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  body: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}
const Modals: React.FC<ModalProps> = ({ isOpen, body, footer, header }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {typeof document !== "undefined" && (
        <>
          {ReactDOM.createPortal(
            <div
              className={`fixed ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
              } left-1/2 top-1/2 z-10 flex h-fit w-[60vw] max-w-[250px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center overflow-hidden rounded-[8px] bg-black p-9 text-white transition-opacity duration-500  sm:w-[60vw] sm:max-w-[450px] sm:items-start`}
            >
              {/* Main content */}
              <div className="flex w-full max-w-[300px] flex-col gap-14 sm:w-[calc(100%-0px)] sm:max-w-[488px]">
                {header}
                {/* content */}
                {body}
                {footer}
              </div>
            </div>,
            document.getElementById("portal") as HTMLElement
          )}
        </>
      )}
    </>
  );
};
export default Modals;

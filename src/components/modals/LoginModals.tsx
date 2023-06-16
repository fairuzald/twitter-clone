import React, { useCallback, useState } from "react";
import TextInput from "../TextInput";
import CrossIcon from "../icons/CrossIcon";
import useLoginModal from "@/hooks/useLoginModals";
import useRegisterModal from "@/hooks/useRegistrationModals";
import Button from "../Button";
import Modals from "./Modals";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
interface LoginModalProps {
  providers?: any;
}
const LoginModals: React.FC<LoginModalProps> = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal, isLoading]);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn("credentials", { email, password });
      toast.success("Logged in"), loginModal.onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      loginModal.onOpen();
    }
  }, [loginModal, email, password]);

  const body = (
    <div className="flex flex-col gap-6 lg:gap-7">
      {providers &&
        Object.values(providers).map(
          (provider: any) =>
            provider.name !== "Credentials" && (
              <div
                key={provider.name}
                className="flex items-center justify-center"
              >
                <button
                  onClick={() => signIn(provider.id)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-twitter-white px-4 py-2 text-black lg:gap-5 lg:px-8"
                >
                  <Image
                    src="/google-icon.png"
                    width={64}
                    height={64}
                    alt="Google Icon"
                    className="h-7 w-7 lg:h-8 lg:w-8"
                  />
                  Log in with {provider.name}
                </button>
              </div>
            )
        )}
      <div className="flex items-center justify-center gap-5">
        <span className="w-1/3 border-[1px] border-slate-300" />
        <p className="text-sm text-slate-300 md:text-base">Or</p>
        <span className="w-1/3 border-[1px] border-slate-300" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <TextInput
          type="text"
          required
          placeholder="Input Email"
          value={email}
          setValue={setEmail}
          disabled={false}
        />
        <TextInput
          type="password"
          required
          placeholder="Input Password"
          value={password}
          setValue={setPassword}
          disabled={false}
        />
        <div className="mt-3 flex w-full">
          <Button color="white" onClick={onSubmit}>
            Log in
          </Button>
        </div>
      </div>
    </div>
  );

  const header = (
    <div className="flex flex-row items-center justify-between">
      {/* title */}
      <h2 className="items-center text-center text-[22px] font-bold leading-10 tracking-wider sm:items-start sm:text-left lg:text-2xl">
        Login
      </h2>
      {/* Close cross icon */}
      <button onClick={loginModal.onClose} className=" h-4 w-4 lg:h-5 lg:w-5">
        <CrossIcon style="w-full h-full fill-white" />
      </button>
    </div>
  );
  const footer = (
    <div className="mx-auto flex items-center justify-center gap-3 text-sm lg:text-base">
      <p className="flex items-center justify-center text-white">
        First using Twitter ?{" "}
      </p>
      <button onClick={onToggle}>
        <p className="text-twitter-blue">Create an account</p>
      </button>
    </div>
  );

  return (
    <Modals
      isOpen={loginModal.isOpen}
      header={header}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModals;

import React, { useCallback, useState } from "react";
import TextInput from "../TextInput";
import CrossIcon from "../icons/CrossIcon";
import useLoginModal from "@/hooks/useLoginModals";
import useRegisterModal from "@/hooks/useRegistrationModals";
import Button from "../Button";
import Modals from "./Modals";
import Image from "next/image";
import { signIn } from "next-auth/react";
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
  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      loginModal.onOpen();
    }
  }, [loginModal]);

  const body = (
    <div className="flex flex-col gap-7">
      {providers&&Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="flex items-center justify-center">
          <button
            onClick={() => signIn(provider.id)}
            className="flex w-full items-center justify-center gap-5 rounded-full bg-twitter-white px-8 py-2 text-black"
          >
            <Image
              src="/google-icon.png"
              width={64}
              height={64}
              alt="Google Icon"
              className="h-8 w-8"
            />
            Log in with {provider.name}
          </button>
        </div>
      ))}
      <div className="flex items-center justify-center gap-5">
        <span className="w-1/3 border-[1px] border-slate-300" />
        <p className="text-slate-300 ">Atau</p>
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
        <div className="flex w-full mt-3">
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
      <h2 className="font-gantari-b items-center text-center text-2xl font-bold leading-10 tracking-wider sm:items-start sm:text-left">
        Login
      </h2>
      {/* Close cross icon */}
      <button onClick={loginModal.onClose} className=" h-5 w-5">
        <CrossIcon style="w-full h-full fill-white" />
      </button>
    </div>
  );
  const footer = (
    <p className="flex gap-2 text-white items-center justify-center">
      First using Twitter ?{" "}
      <button onClick={onToggle}>
        <span className="text-twitter-blue">Create an account</span>
      </button>
    </p>
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

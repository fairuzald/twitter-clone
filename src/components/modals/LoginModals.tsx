import React, { useCallback, useState } from "react";
import TextInput from "../TextInput";
import CrossIcon from "../icons/CrossIcon";
import useLoginModal from "@/hooks/useLoginModals";
import useRegisterModal from "@/hooks/useRegistrationModals";
import Button from "../Button";
import Modals from "./Modals";

const LoginModals = () => {
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
    <div className="flex flex-col gap-5">
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
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Button color="white" onClick={onSubmit}>
        Submit
      </Button>
      <p className="text-slate-500">
        First using Twitter ?{" "}
        <span className="text-white" onClick={onToggle}>
          Create an account
        </span>
      </p>
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

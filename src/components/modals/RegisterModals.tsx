import React, { useCallback, useState } from "react";
import TextInput from "../TextInput";
import CrossIcon from "../icons/CrossIcon";
import useLoginModal from "@/hooks/useLoginModals";
import useRegisterModal from "@/hooks/useRegistrationModals";
import Button from "../Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Modals from "./Modals";
import axios from "axios";
import { toast } from "react-hot-toast";
interface RegisterModalProps {
  providers?: any;
}
const RegisterModals: React.FC<RegisterModalProps> = ({ providers }) => {
  // Define the state variables using the useState hook.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // Define a callback function for the form submission.
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("api/register", { email, username, name, password });
      toast.success("Account Created");
      signIn("credentials", { email, password });
      registerModal.onClose();
    } catch (err) {
      toast.error("Something went error");
      console.log(err);
    } finally {
      setIsLoading(false);
      registerModal.onOpen();
    }
  }, [registerModal, email, username, password, name]);
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  // Define the JSX structure for the modal body.
  const body = (
    <div className="flex flex-col gap-7">
      {providers &&
        Object.values(providers).map((provider: any) => (
          provider.name!=="Credentials"&&
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
              Sign Up with {provider.name}
            </button>
          </div>
        ))}
      <div className="flex items-center justify-center gap-5">
        <span className="w-1/3 border-[1px] border-slate-300" />
        <p className="text-slate-300 ">Or</p>
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
          type="text"
          required
          placeholder="Input name"
          value={name}
          setValue={setName}
          disabled={false}
        />
        <TextInput
          type="text"
          required
          placeholder="Input Username"
          value={username}
          setValue={setUsername}
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
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );

  // Define the JSX structure for the modal header.
  const header = (
    <div className="flex flex-row items-center justify-between">
      {/* title */}
      <h2 className="font-gantari-b items-center text-center text-2xl font-bold leading-10 tracking-wider sm:items-start sm:text-left">
        Sign Up
      </h2>
      {/* Close cross icon */}
      <button onClick={registerModal.onClose} className=" h-5 w-5">
        <CrossIcon style="w-full h-full fill-white" />
      </button>
    </div>
  );

  // Define the JSX structure for the modal footer.
  const footer = (
    <p className="flex items-center justify-center gap-2 text-white">
      First using Twitter ?{" "}
      <button onClick={onToggle}>
        <span className="text-twitter-blue">Create an account</span>
      </button>
    </p>
  );

  // Return the Modals component with the defined header, body, and footer JSX structures.
  return (
    <Modals
      isOpen={registerModal.isOpen}
      header={header}
      body={body}
      footer={footer}
    />
  );
};

export default RegisterModals;

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import Image from "next/image";
import RegisterModals from "@/components/modals/RegisterModals";
import LoginModals from "@/components/modals/LoginModals";
import { useState, type ReactElement, useEffect } from "react";
import { signIn } from "next-auth/react";
import TwitterIcon from "@/components/icons/TwitterIcon";
import Button from "@/components/Button";
import useRegisterModal from "@/hooks/useRegistrationModals";
import useLoginModal from "@/hooks/useLoginModals";
import PageHead from "@/components/PageHead";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mount, setMount] = useState(false);
  const [finish, setFinish] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // Image mounting on mobile
  useEffect(() => {
    setMount(true);
    const timeout = setTimeout(() => setFinish(true), 2700);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <PageHead
        title="Log In | Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      <div className="flex h-screen w-full  bg-black md:items-center md:justify-center">
        <RegisterModals providers={providers} />
        <LoginModals providers={providers} />
        <div
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition delay-[2000ms] duration-[700ms] ease-in-out ${
            mount ? "opacity-0" : "opacity-100"
          } ${
            finish ? "-z-10" : "z-50"
          } md:static md:z-0 md:w-1/2 md:opacity-100 md:transition-none xl:w-7/12`}
        >
          <Image
            src="/login-background.png"
            alt="Background Login Page"
            width="1047"
            height="883"
            className="relative h-screen w-full overflow-hidden object-cover object-left md:object-center"
          ></Image>
        </div>
        <h1
          className={`absolute z-[99]  transition delay-[1700ms] duration-[700ms] ease-in-out ${
            mount ? "opacity-0" : "opacity-100"
          } ${
            finish ? "-z-10" : "z-50"
          } left-[70px] top-[170px] w-[100px] text-3xl lg:text-4xl font-extrabold text-twitter-dark-gray md:hidden`}
        >
          Join Twitter Now
        </h1>
        {/* Text Content */}
        <div className="flex h-screen w-full justify-center md:w-6/12 md:items-center">
          <div className="hidden w-full flex-col gap-20 px-9 text-white md:flex lg:px-12 xl:px-14">
            {/* Twitter Icon */}
            <span>
              <TwitterIcon style="fill-white w-12 h-12" />
            </span>
            {/* description */}
            <h2 className="font-bold md:text-4xl lg:text-5xl xl:text-6xl">
              It&apos;s trending right now
            </h2>
            {/* Login Section */}
            <div className="flex flex-col gap-5">
              {/* Subtitle persuative sign up */}
              <h3 className="mb-7 text-[26px] font-semibold">
                Join Twitter right now.
              </h3>
              {/* Section mechanism sign up */}
              <div className="flex flex-col gap-2 pr-20 w-full lg:pr-24 xl:pr-32 2xl:pr-48">
                {/* Mapping button Provider */}
                {providers &&
                  Object.values(providers).map(
                    (provider) =>
                      provider.name !== "Credentials" && (
                        <div
                          key={provider.name}
                          className="flex items-center justify-center w-full"
                        >
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
                            Sign in with {provider.name}
                          </button>
                        </div>
                      )
                  )}
                {/* Text or */}
                <div className="flex items-center justify-center gap-5">
                  <span className="w-1/3 border-[1px] border-slate-300" />
                  <p className="text-slate-300 ">Or</p>
                  <span className="w-1/3 border-[1px] border-slate-300" />
                </div>
                {/* Button for sign up */}
                <Button
                  color="blue"
                  onClick={() => {
                    registerModal.onOpen();
                  }}
                >
                  Sign Up
                </Button>
              </div>
              {/* Footer */}
              <p className="text-sm lg:text-[15px] text-slate-300">
                By registering, you agree to the Terms of Service and Privacy
                Policy, including the Use of Cookies.
              </p>
            </div>
            {/* Login Section */}
            <div className="flex flex-col gap-4">
              {/* Persuative to login */}
              <h3 className="text-xl font-semibold">
                Already have an account?
              </h3>
              {/* Login BUtton */}
              <div className=" lg:pr-24 xl:pr-32 2xl:pr-48">
                <Button
                  color="trans-blue"
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between overflow-hidden p-10 text-white md:hidden">
            {/* Twitter Icon */}
            <div className="flex flex-col items-center justify-center gap-16">
              <span>
                <TwitterIcon style="fill-twitter-white w-6 h-6 mx-auto" />
              </span>
              {/* description */}
              <h2 className="text-2xl font-bold md:text-6xl">
                See what&apos;s happening in the world right now
              </h2>
            </div>
            {/* Login Section */}
            <div className="flex w-full flex-col items-center justify-between gap-14">
              {/* Section mechanism sign up */}
              <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
                {/* Mapping button Provider */}
                {providers &&
                  Object.values(providers).map(
                    (provider) =>
                      provider.name !== "Credentials" && (
                        <div
                          key={provider.name}
                          className="flex w-full items-center justify-center sm:w-[450px]"
                        >
                          <button
                            onClick={() => signIn(provider.id)}
                            className="flex w-full items-center justify-center gap-5 rounded-full bg-twitter-white px-8 py-2 text-sm text-black md:text-base"
                          >
                            <Image
                              src="/google-icon.png"
                              width={64}
                              height={64}
                              alt="Google Icon"
                              className="h-8 w-8"
                            />
                            Sign in with {provider.name}
                          </button>
                        </div>
                      )
                  )}
                {/* Text or */}
                <div className="flex w-full items-center justify-center gap-5">
                  <span className="w-1/3 border-[1px] border-slate-300 sm:w-[160px]" />
                  <p className="text-slate-300 ">Or</p>
                  <span className="w-1/3 border-[1px] border-slate-300 sm:w-[160px]" />
                </div>
                {/* Button for sign up */}
                <div className="mx-auto w-full sm:w-[450px]">
                  <Button
                    color="blue"
                    onClick={() => {
                      registerModal.onOpen();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
              {/* Footer */}
              <p className="break-all text-left text-sm text-slate-300">
                By registering, you agree to the Terms of Service and Privacy
                Policy, including the Use of Cookies.
              </p>
              {/* Login Section */}
              <div className="flex flex-col items-center justify-center gap-4">
                {/* Persuative to login */}
                <h3 className="text-lg font-semibold md:text-xl">
                  Already have an account?
                </h3>
                {/* Login BUtton */}
                <Button
                  color="trans-blue"
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Login.getLayout = function getLayout(page: ReactElement) {
  return <div className="w-full">{page}</div>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

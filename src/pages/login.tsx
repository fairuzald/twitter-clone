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
import type { ReactElement } from "react";
import { signIn } from "next-auth/react";
import TwitterIcon from "@/components/icons/TwitterIcon";
import Button from "@/components/Button";
import useRegisterModal from "@/hooks/useRegistrationModals";
import useLoginModal from "@/hooks/useLoginModals";
import PageHead from "@/components/PageHead";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  return (
    <>
      <PageHead
        title="Log In | Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <RegisterModals providers={providers} />
        <LoginModals providers={providers} />
        <div className="h-screen w-7/12">
          <Image
            src="/login-background.png"
            alt="Background Login Page"
            width="1047"
            height="883"
            className="h-full w-full overflow-hidden object-cover object-center"
          />
        </div>
        {/* Text Content */}
        <div className="flex w-5/12 items-center justify-center">
          <div className="flex w-full flex-col gap-20 px-14 text-white">
            {/* Twitter Icon */}
            <span>
              <TwitterIcon style="fill-white w-12 h-12" />
            </span>
            {/* description */}
            <h2 className="text-6xl font-bold">It&apos;s trending right now</h2>
            {/* Login Section */}
            <div className="flex flex-col gap-2">
              {/* Subtitle persuative sign up */}
              <h3 className="mb-7 text-[26px] font-semibold">
                Join Twitter right now.
              </h3>
              {/* Section mechanism sign up */}
              <div className="flex flex-col gap-2 pr-32">
                {/* Mapping button Provider */}
                {providers &&
                  Object.values(providers).map(
                    (provider) =>
                      provider.name !== "Credentials" && (
                        <div
                          key={provider.name}
                          className="flex items-center justify-center"
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
              <p className="text-sm text-slate-300">
                By registering, you agree to the Terms of Service and Privacy
                Policy, including the Use of Cookies.
              </p>
            </div>
            {/* Login Section */}
            <div className="flex flex-col gap-2">
              {/* Persuative to login */}
              <h3 className="text-xl font-semibold">
                Already have an account?
              </h3>
              {/* Login BUtton */}
              <div className="pr-32">
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

import Button from "@/components/Button";
import Header from "@/components/Header";
import LoginModals from "@/components/modals/LoginModals";
import RegisterModals from "@/components/modals/RegisterModals";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModals";
import useRegisterModal from "@/hooks/useRegistrationModals";
import { getServerSession } from "next-auth/next";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/server/auth";
import FormTweet from "@/components/FormTweet";
import PostFeed from "@/components/PostFeed";
import PageHead from "@/components/PageHead";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <>
      <PageHead
        title="Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      <Header label="Home" />
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <main className="flex  flex-col bg-black bg-gradient-to-b">
          {currentUser ? (
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center gap-4 border-y border-twitter-border p-4">
                <FormTweet currentUser={currentUser} isCurrentUserLoading={isLoading}/>
              </div>
              <PostFeed />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 border-y border-twitter-border p-12">
              <h4 className="text-xl font-semibold text-white">
                Welcome to Twitter
              </h4>
              <div className="flex gap-5">
                <LoginModals />
                <RegisterModals />
                <Button color="blue" onClick={loginModal.onOpen}>
                  Login
                </Button>
                <Button color="white" onClick={registerModal.onOpen}>
                  Register
                </Button>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   // If the user is already logged in, redirect.
//   // Note: Make sure not to redirect to the same page
//   // To avoid an infinite loop!
//   if (session) {
//     return { redirect: { destination: "/" } };
//   }

//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }

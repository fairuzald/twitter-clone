import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import Image from "next/image";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {data, status} = useSession()
    console.log(data, status)
  return (
    <div className="flex h-screen items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="flex items-center rounded-full bg-twitter-white px-8 py-2 text-black gap-5"
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
      ))}
    </div>
  );
}

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

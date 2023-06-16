// Importing necessary components and hooks
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PostFeed from "@/components/PostFeed";
import PageHead from "@/components/PageHead";
import UserHero from "@/components/UserHero";
import UserBio from "@/components/UserBio";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const UserDetails = () => {
  // Get userId from guery page
  const router = useRouter();
  const { userId } = router.query;

  // Fetch user data using the useUser hook
  const { data: user } = useUser(userId as string);

  // Fetch current user data using the useCurrentUser hook
  const { data: currentUser } = useCurrentUser();
  const { data:sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && !sessionData) {
      toast.error("You must login to use");
      router.push("/login");
    }
  }, [router, status, sessionData]);
  return (
    <>
      <PageHead
        title={user?.name ? `${user?.name} | Twitter Clone` : "Twitter Clone"}
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      {/* Header component */}
      <Header showArrowButton label={user?.name} />

      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col border-b border-twitter-border pb-6">
          {/* User Hero */}
          <UserHero user={user} />
          {/* User Bio */}
          <UserBio
            user={user}
            currentUser={currentUser}
            userId={userId as string}
          />
        </div>

        {/* PostFeed component */}
        <PostFeed userId={user?.id as string} />
      </div>
    </>
  );
};

export default UserDetails;

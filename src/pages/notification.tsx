import Header from "@/components/Header";
import PageHead from "@/components/PageHead";
import TwitterIcon from "@/components/icons/TwitterIcon";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Notifications = () => {
  // Using the useCurrentUser hook to get the current user data and its loading state
  const {
    data: currentUser,
    mutate: mutateCurrentUser,
    isLoading: currentUserLoading,
  } = useCurrentUser();

  // Using the useNotifications hook to get the notifications data and its loading state
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    currentUser?.id
  );

  // Run this effect when the mutateCurrentUser function changes
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && !sessionData) {
      toast.error("You must login to use");
      router.push("/login");
    }
  }, [router, status, sessionData]);
  return (
    <>
      {/* Page metadata */}
      <PageHead
        title="Notifications | Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      <Header showArrowButton label="Notifications" />

      {isLoading || currentUserLoading ? (
        // Show loading spinner if either the notifications or current user data is loading
        <div className="flex h-screen w-full items-center justify-center">
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // No notifications found
        <>
          {fetchedNotifications.length === 0 ? (
            // Show "No notifications" message if there are no notifications
            <div className="p-6 text-center text-xl text-twitter-light-gray">
              No notifications
            </div>
          ) : (
            // Notifications found
            <>
              {/* Header component */}

              {/* Render the list of notifications */}
              <div className="flex flex-col">
                {fetchedNotifications.map(
                  (notification: Record<string, any>) => (
                    <div
                      key={notification.id}
                      className="flex flex-row items-center gap-4 border-b-[1px] border-twitter-border p-[17px] lg:p-6"
                    >
                      <TwitterIcon style="fill-white w-7 h-7 lg:w-8 lg:h-8" />
                      <p className="text-white text-sm lg:text-base">{notification.body}</p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Notifications;

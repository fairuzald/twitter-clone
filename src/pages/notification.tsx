import Header from "@/components/Header";
import PageHead from "@/components/PageHead";
import TwitterIcon from "@/components/icons/TwitterIcon";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Notifications = () => {
  const {
    data: currentUser,
    mutate: mutateCurrentUser,
    isLoading: currentUserLoading,
  } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    currentUser?.id
  );
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  return (
    <>
      <PageHead
        title="Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      {isLoading || currentUserLoading ? (
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
        <>
          {fetchedNotifications.length === 0 ? (
            <div className="p-6 text-center text-xl text-neutral-600">
              No notifications
            </div>
          ) : (
            <>
              <Header showArrowButton label="Notifications" />
              <div className="flex flex-col">
                {fetchedNotifications.map(
                  (notification: Record<string, any>) => (
                    <div
                      key={notification.id}
                      className="flex flex-row items-center gap-4 border-b-[1px] border-neutral-800 p-6"
                    >
                      <TwitterIcon style="fill-white w-8 h-8" />
                      <p className="text-white">{notification.body}</p>
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

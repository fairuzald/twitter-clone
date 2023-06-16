import Header from "@/components/Header";
import TwitterIcon from "@/components/icons/TwitterIcon";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";


const Notifications = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications
      </div>
    );
  }
  return (
    <>
      <Header showArrowButton label="Notifications" />
      <div className="flex flex-col">
        {fetchedNotifications.map((notification: Record<string, any>) => (
          <div
            key={notification.id}
            className="flex flex-row items-center gap-4 border-b-[1px] border-neutral-800 p-6"
          >
            <TwitterIcon style="fill-white w-8 h-8" />
            <p className="text-white">{notification.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;

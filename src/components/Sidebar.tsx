import HomeIcon from "./icons/HomeIcon";
import Link from "next/link";
import TwitterIcon from "./icons/TwitterIcon";
import SearchIcon from "./icons/SearchIcon";
import NotificationIcon from "./icons/NotificationIcon";
import ProfileIcon from "./icons/ProfileIcon";
import Button from "./Button";
import SidebarItem from "./SidebarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import LogoutIcon from "./icons/LogoutIcon";
import { signOut } from "next-auth/react";
import NotificationBellIcon from "./icons/NotificationBellIcon";

const Sidebar: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const sideItemData = [
    {
      href: "/",
      icon: <HomeIcon style="w-5 h-5 md:w-6 md:h-6 fill-twitter-white" />,
      text: "Home",
      auth: false,
    },
    {
      href: "/explore",
      icon: <SearchIcon style="w-5 h-5 md:w-6 md:h-6 fill-twitter-white" />,
      text: "Explore",
      auth: true,
    },
    {
      href: "/notification",
      icon: currentUser?.hasNotification ? (
        <NotificationBellIcon style="w-5 h-5 md:w-6 md:h-6 m-0 p-0 fill-white" />
      ) : (
        <NotificationIcon style="w-5 h-5 md:w-6 md:h-6 m-0 p-0 fill-white" />
      ),
      text: "Notification",
      auth: true,
    },
    {
      href: `/users/${currentUser?.id}`,
      icon: <ProfileIcon style="w-5 h-5 md:w-6 md:h-6 fill-twitter-white" />,
      text: "Profile",
      auth: true,
    },
  ];

  return (
    <div className="my-4 flex w-fit h-screen relative flex-col items-center px-6 md:px-7 md:w-[20%] 2xl:w-[31%]">
      <div className="flex w-fit flex-col gap-5 fixed">
        {/* Twitter Image */}
        <div className="flex w-fit items-center justify-center gap-4 rounded-full p-2.5 lg:px-4 lg:py-3 transition duration-300 hover:bg-[#181818]">
          <Link href={"/"}>
            <TwitterIcon style="w-5 h-5 md:w-6 md:h-6 fill-twitter-white" />
          </Link>
        </div>
        {/* Mapping data */}
        <div className="flex w-full lg:w-fit flex-col items-center lg:items-start justify-center gap-2">
          {sideItemData.map((item, index) => (
            <SidebarItem
              key={index}
              linkUrl={item.href}
              icon={item.icon}
              text={item.text}
              auth={item.auth}
            />
          ))}

          {currentUser && (
            <SidebarItem
              onClick={() => {
                signOut();
              }}
              icon={
                <LogoutIcon style="w-5 h-5 md:w-6 md:h-6 fill-twitter-white rotate-180" />
              }
              text="Logout"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

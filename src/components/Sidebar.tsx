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
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Sidebar: React.FC = () => {
  const { data } = useSession();
  const sideItemData = [
    {
      href: "/",
      icon: <HomeIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Home",
      auth: false,
    },
    {
      href: "/",
      icon: <SearchIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Search",
      auth: true,
    },
    {
      href: "/",
      icon: <NotificationIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Notification",
      auth: true,
    },
    {
      href: "/",
      icon: <ProfileIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Profile",
      auth: true,
    },
  ];
  return (
    <div className="my-4 flex w-fit flex-col items-center px-6 lg:w-[31%] lg:px-0">
      <div className="flex w-fit flex-col gap-5">
        {/* Twitter Image */}
        <div className="flex w-fit items-center justify-center gap-4 rounded-full px-4 py-3 hover:bg-[#181818]">
          <Link href={"/"}>
            <TwitterIcon style="w-6 h-6 fill-twitter-white" />
          </Link>
        </div>
        {/* Mapping data */}
        <div className="flex w-fit flex-col justify-center gap-2">
          {sideItemData.map((item, index) => (
            <SidebarItem
              key={index}
              linkUrl={item.href}
              icon={item.icon}
              text={item.text}
              auth={item.auth}
            />
          ))}

          <Button
            color="blue"
            onClick={() => {
              console.log("p");
            }}
          >
            Tweet
          </Button>
          {data && (
            <SidebarItem
              onClick={() => {
                signOut();
              }}
              icon={
                <LogoutIcon style="w-6 h-6 fill-twitter-white rotate-180" />
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

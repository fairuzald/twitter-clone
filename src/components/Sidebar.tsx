import HomeIcon from "./icons/HomeIcon";
import Link from "next/link";
import TwitterIcon from "./icons/TwitterIcon";
import SearchIcon from "./icons/SearchIcon";
import NotificationIcon from "./icons/NotificationIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SidebarItem from "./SideBarItem";
import Button from "./Button";

const Sidebar: React.FC = () => {
  const sideItemData = [
    {
      href: "/",
      icon: <HomeIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Home",
    },
    {
      href: "/",
      icon: <SearchIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Search",
    },
    {
      href: "/",
      icon: <NotificationIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Notification",
    },
    {
      href: "/",
      icon: <ProfileIcon style="w-6 h-6 fill-twitter-white" />,
      text: "Profile",
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
            />
          ))}

          <Button color="blue" onClick={()=>{console.log("p")}}>Tweet</Button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

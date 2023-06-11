import Link from "next/link";
interface SidebarItemProps {
  linkUrl: string;
  icon: React.ReactNode
  text: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ linkUrl, icon, text }) => {
  return (
    <Link
      href={linkUrl}
      className="flex w-fit items-center justify-center gap-4 rounded-full px-4 py-3 transition duration-300 hover:bg-[#181818]"
    >
      {icon}
      <h3 className="hidden text-xl text-twitter-white lg:block">{text}</h3>
    </Link>
  );
};

export default SidebarItem;

import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface SidebarItemProps {
  onClick?: () => void;
  linkUrl?: string;
  icon: React.ReactNode;
  text: string;
  auth?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  linkUrl,
  icon,
  text,
  onClick,
  auth,
}) => {
  // const { data: currentUser } = useCurrentUser();
  const { data } = useSession();
  console.log(data);
  return auth && !data ? (
    <Link
      href="/login"
      className="flex w-fit items-center justify-center gap-4 rounded-full px-4 py-3 transition duration-300 hover:bg-[#181818]"
    >
      {icon}
      <h3 className="hidden text-xl text-twitter-white lg:block">{text}</h3>
    </Link>
  ) : linkUrl ? (
    <Link
      href={linkUrl}
      className="flex w-fit items-center justify-center gap-4 rounded-full px-4 py-3 transition duration-300 hover:bg-[#181818]"
    >
      {icon}
      <h3 className="hidden text-xl text-twitter-white lg:block">{text}</h3>
    </Link>
  ) : (
    <button
      className="flex w-fit items-center justify-center gap-4 rounded-full px-4 py-3 transition duration-300 hover:bg-[#181818]"
      onClick={onClick}
    >
      {icon}
      <h3 className="hidden text-xl text-twitter-white lg:block">{text}</h3>
    </button>
  );
};

export default SidebarItem;

import React from "react";
import Image from "next/image";
import Avatar from "./Avatar";
interface UserHeroProps {
  user: Record<any, string>;
}
const UserHero: React.FC<UserHeroProps> = ({ user }) => {
  return (
    <div className="relative flex h-40 lg:h-60 w-full bg-[#333639]">
      {/* Display the user's cover image */}
      {user && user.coverImage && (
        <Image
          src={user.coverImage}
          alt={"Cover Image"}
          width="1920"
          height="1080"
          className="0bject-center h-full w-full overflow-hidden object-cover"
        />
      )}
      {/* Display the user's avatar */}
      <div className="absolute -bottom-11 lg:-bottom-16 left-4">
        <Avatar userId={user?.id as string} size="large" isBorder />
      </div>
    </div>
  );
};

export default UserHero;

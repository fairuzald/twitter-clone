import useUser from "@/hooks/useUser";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Avatar = ({
  userId,
  size,
  isBorder,
}: {
  userId: string;
  size: "small" | "medium" | "large";
  isBorder?: boolean;
}) => {
  const sizeStyle = {
    small: `h-10 w-10 ${isBorder&&"border-[1px] border-slate-700"}`,
    medium: `h-24 w-24 ${isBorder&&"border-[2px] border-black"}`,
    large: `w-32 h-32 ${isBorder&&"border-[4px] border-black"}`,
  };
  const router = useRouter();
  const { data: user } = useUser(userId);
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <button
      className={`${sizeStyle[size]} rounded-full`}
      onClick={onClick}
    >
      <Image
        src={user?.profileImage ? user.profileImage : "/profile.png"}
        alt={user?.name + "Profile Picture"}
        width={64}
        height={64}
        className="h-full w-full overflow-hidden rounded-full object-cover object-center"
      />
    </button>
  );
};

export default Avatar;

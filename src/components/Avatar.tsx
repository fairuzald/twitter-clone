import useUser from "@/hooks/useUser";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Avatar = ({
  userId,
  size,
  isBorder,
  disabledLink,
}: {
  userId: string;
  size: "small" | "medium" | "large" | "base";
  isBorder?: boolean;
  disabledLink?: boolean;
}) => {
  const sizeStyle = {
    small: `w-8 h-8 lg:h-10 lg:w-10 ${
      isBorder && "border-[1px] border-slate-700"
    }`,
    base: "w-10 h-10 lg:h-12 lg:w-12",
    medium: `h-24 w-24 ${isBorder && "border-[2px] border-black"}`,
    large: `w-20 h-240 lg:w-32 lg:h-32 ${
      isBorder && "border-[4px] border-black"
    }`,
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
  return disabledLink ? (
    <div
      className={`${sizeStyle[size]} overflow-hidden rounded-full object-cover object-center`}
      onClick={onClick}
    >
      <Image
        src={user?.profileImage ? user.profileImage : "/profile.png"}
        alt={user?.name + "Profile Picture"}
        width={64}
        height={64}
        className="h-full w-full overflow-hidden rounded-full object-cover object-center"
      />
    </div>
  ) : (
    <button
      className={`${sizeStyle[size]} overflow-hidden rounded-full object-cover object-center`}
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

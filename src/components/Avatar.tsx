import useUser from "@/hooks/useUser";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Avatar = ({ userId }: { userId: string }) => {
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
      className="h-10 w-10 rounded-full border-[1px] border-slate-700"
      onClick={onClick}
    >
      <Image
        src={user?.image ? user.image : "/profile.png"}
        alt={user?.name + "Profile Picture"}
        width={64}
        height={64}
        className="h-full w-full overflow-hidden rounded-full object-cover object-center"
      />
    </button>
  );
};

export default Avatar;

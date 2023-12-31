import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

const UserProfile = ({ data }: { data: Record<any, string> }) => {
  return (
    data && (
      <Link href={`/users/${data.id}`}>
        {/* Container */}
        <div className=" flex w-full items-center gap-4 py-2">
          {/* Avatar */}
          <Avatar size="base" disabledLink userId={data.id as string} />
          {/* Content Text*/}
          <div className=" gap-1 flex flex-col text-sm lg:text-base">
            <p className="font-semibold text-white">{data.name}</p>
            <p className="text-twitter-light-gray">@{data.username}</p>
          </div>
        </div>
      </Link>
    )
  );
};

export default UserProfile;

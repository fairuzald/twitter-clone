import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

const UserProfile = ({
  data,
  isLink,
}: {
  data: Record<any, string>;
  isLink?: boolean;
}) => {
  return (
    data &&
    (isLink ? (
      <Link href={`/users/${data.id}`}>
        <div className=" flex w-full py-2">
          <div className=" flex w-full items-center gap-4">
            <Avatar size="small" disabledLink userId={data.id as string} />
            <div className=" gap1 flex flex-col">
              <p className="font-semibold text-white">{data.name}</p>
              <p className="text-neutral-500">@{data.username}</p>
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <div className=" flex w-full py-2">
        <div className=" flex w-full items-center gap-4">
          <Avatar size="small" disabledLink userId={data.id as string} />
          <div className=" gap1 flex flex-col">
            <p className="font-semibold text-white">{data.name}</p>
            <p className="text-neutral-500">@{data.username}</p>
          </div>
        </div>
      </div>
    ))
  );
};

export default UserProfile;

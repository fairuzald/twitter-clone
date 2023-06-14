import React, { useMemo } from "react";
import Avatar from "./Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import CircleIcon from "./icons/CircleIcon";
import CommentIcon from "./icons/CommentIcon";
import LoveIcon from "./icons/LoveIcon";

const PostItem = ({
  data,
  userId,
}: {
  data: Record<string, any>;
  userId?: string;
}) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  return (
    <div className="flex border-y-[0.5px] w-full border-twitter-border">
      <div className="flex gap-4 px-4 py-2 w-full">
        <Avatar userId={data.user.id} size="small" isBorder />
        <div className="flex flex-col gap-1 flex-1">
          {/* Identity */}
          <div className="flex items-center  gap-x-2">
            <h5 className="text-white">{data.user.name}</h5>
            <span className="text-neutral-500">@{data.user.username}</span>

            <span className="flex items-center justify-center text-neutral-500">
              <CircleIcon style="fill-neutral-500 w-1 h-1 mr-1" />
              {createdAt}
            </span>
          </div>
          {/* The body */}
          <p className="text-white">{data.body}</p>
          <div className="flex gap-10">
            <div className="flex items-center justify-center text-neutral-500 hover:text-twitter-blue">
              <CommentIcon style="w-9 h-9 fill-neutral-500 hover:fill-twitter-blue p-2 hover:bg-twitter-blue hover:bg-opacity-20 rounded-full" />
              <p className="px-1 hover:text-neutral-500">
                {data.comment?.length || 0}
              </p>
            </div>
            <div className="flex items-center justify-center text-neutral-500 hover:text-[#F91880]">
              <LoveIcon style="w-9 h-9 fill-neutral-500 hover:fill-[#F91880] p-2 hover:bg-[#F91880] hover:bg-opacity-20 rounded-full" />
              <p className="px-1 hover:text-neutral-500">
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

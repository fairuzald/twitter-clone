import { formatDistanceToNowStrict } from "date-fns";
import React, { useMemo } from "react";
import Avatar from "./Avatar";
import CircleIcon from "./icons/CircleIcon";
import CommentIcon from "./icons/CommentIcon";
import LoveIcon from "./icons/LoveIcon";

const CommentItem = ({ data }: { data: Record<string, any> }) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  return (
    <div className="flex w-full border-y-[0.5px] border-twitter-border">
      <div className="flex w-full gap-4 px-4 py-2">
        <Avatar userId={data.user.id} size="small" isBorder />

        <div className="flex flex-1 flex-col gap-1">
          {/* Identity */}
          <div className="flex items-center  gap-x-2">
            <h5 className="text-white">{data.user?.name as string}</h5>
            <span className="text-neutral-500">@{data.user.username}</span>

            <span className="flex items-center justify-center text-neutral-500">
              <CircleIcon style="fill-neutral-500 w-1 h-1 mr-1" />
              {createdAt}
            </span>
          </div>
          {/* The body */}
          <p className="text-white">{data?.body}</p>
       
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

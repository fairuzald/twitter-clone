import { formatDistanceToNowStrict } from "date-fns";
import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import CircleIcon from "./icons/CircleIcon";
import { useRouter } from "next/router";

const CommentItem = ({ data }: { data: Record<string, any> }) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  const router = useRouter()
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const url = `/users/${data?.userId}`;
      router.push(url);
    },
    [router, data?.userId]
  );

  return (
    <div className="flex w-full items-start justify-start border-y-[0.5px] border-twitter-border py-2">
      <div className="flex w-full gap-4 px-4 py-2">
        <Avatar userId={data.user.id} size="small" isBorder />

        <div className="flex flex-1 flex-col gap-1 text-sm lg:text-base">
          {/* Identity */}
          <div className="flex items-center gap-x-2">
            <button onClick={onClick}>
              <h5 className="text-white hover:underline w-fit max-w-[70px] text-left truncate hover:underline-offset-2">
                {data?.user.name}
              </h5>
            </button>
            <button onClick={onClick}>
              <span className="text-twitter-light-gray">
                @{data?.user.username}
              </span>
            </button>
            <span className="flex items-center justify-center text-twitter-light-gray">
              <CircleIcon style="fill-twitter-light-gray w-1 h-1 mr-1" />
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

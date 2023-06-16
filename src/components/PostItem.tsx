import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import CircleIcon from "./icons/CircleIcon";
import CommentIcon from "./icons/CommentIcon";
import LoveIcon from "./icons/LoveIcon";
import Link from "next/link";
import useLike from "@/hooks/UseLike";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModals from "./modals/LoginModals";
import useLoginModal from "@/hooks/useLoginModals";
import LoveIconFill from "./icons/LoveIconFill";

const PostItem = ({
  data,
  userId,
  onComment,
}: {
  data: Record<string, any>;
  userId?: string;
  onComment?: () => void;
}) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  const postId = data?.id;
  const { isLike, toggleLike } = useLike({ userId, postId });
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      return toggleLike();
    },
    [loginModal, toggleLike, currentUser]
  );
  return (
    <div className="flex w-full border-y-[0.5px] border-twitter-border">
      <div className="flex w-full gap-4 px-4 py-2">
        <Avatar userId={data?.user.id} size="small" isBorder />
        <div className="flex flex-1 flex-col gap-1">
          {/* Identity */}
          <div className="flex items-center  gap-x-2">
            <h5 className="text-white">{data?.user.name}</h5>
            <span className="text-neutral-500">@{data?.user.username}</span>

            <span className="flex items-center justify-center text-neutral-500">
              <CircleIcon style="fill-neutral-500 w-1 h-1 mr-1" />
              {createdAt}
            </span>
          </div>
          {/* The body */}
          <p className="text-white">{data?.body}</p>
          <div className="flex gap-10">
            <div className="flex items-center justify-center text-neutral-500 hover:text-twitter-blue">
              <button onClick={onComment}>
                <CommentIcon style="w-9 h-9 fill-neutral-500 hover:fill-twitter-blue p-2 hover:bg-twitter-blue hover:bg-opacity-20 rounded-full" />
              </button>
              <p className="px-1 hover:text-neutral-500">
                {data?.comments?.length || 0}
              </p>
            </div>
            <div className="flex items-center justify-center text-neutral-500 hover:text-[#F91880]">
              <button onClick={onLike}>
                {isLike ? (
                  <LoveIconFill style="w-9 h-9 fill-neutral-500 hover:fill-[#F91880] p-2 hover:bg-[#F91880] hover:bg-opacity-20 rounded-full" />
                ) : (
                  <LoveIcon style="w-9 h-9 fill-neutral-500 hover:fill-[#F91880] p-2 hover:bg-[#F91880] hover:bg-opacity-20 rounded-full" />
                )}
              </button>
              <p className="px-1 hover:text-neutral-500">
                {data?.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

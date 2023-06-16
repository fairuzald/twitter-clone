import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import CircleIcon from "./icons/CircleIcon";
import CommentIcon from "./icons/CommentIcon";
import LoveIcon from "./icons/LoveIcon";
import useLike from "@/hooks/UseLike";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModals from "./modals/LoginModals";
import useLoginModal from "@/hooks/useLoginModals";
import LoveIconFill from "./icons/LoveIconFill";
import { useRouter } from "next/router";

const PostItem = ({
  data,
  userId,
}: {
  data: Record<string, any>;
  userId?: string;
}) => {
  const postId = data?.id;
  const router = useRouter();

  // Custom hook for handling like functionality
  const { isLike, toggleLike } = useLike({ userId, postId });

  // Custom hook for fetching current user data
  const { data: currentUser } = useCurrentUser();

  // Custom hook for login modals
  const loginModal = useLoginModal();

  // Handler for the like button click
  const onLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      return toggleLike();
    },
    [loginModal, toggleLike, currentUser]
  );

  // Handler for the  comment click
  const onComment = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      return router.push(`/posts/${postId}`);
    },
    [loginModal, currentUser, postId, router]
  );
  // Handler for click the profile
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  // Formatting data createdAt
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="flex w-full border-b-[1px] border-twitter-border text-base">
      <LoginModals />
      {/* CONTAINER */}
      <div className="flex w-full gap-4 px-4 py-2">
        {/* AVATAR */}
        <Avatar userId={data?.user.id} size="small" isBorder />

        {/* TEXT CONTENT */}
        <div className="flex flex-1 flex-col gap-1">
          {/* USER IDENTITY */}
          <div className="flex items-center  gap-x-2">
            <button onClick={onClick}>
              <h5 className="text-white hover:underline hover:underline-offset-2">
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

          {/* THE BODY */}
          <p className="text-white">{data?.body}</p>

          <div className="flex items-start justify-start gap-x-10">
            {/* COMMENT SECTION */}
            <div className="flex items-center justify-center text-twitter-light-gray hover:text-twitter-blue">
              <button onClick={onComment}>
                <CommentIcon style="w-9 h-9 fill-twitter-light-gray hover:fill-twitter-blue p-2 hover:bg-twitter-blue hover:bg-opacity-20 rounded-full" />
              </button>
              <p className="px-1 hover:text-twitter-light-gray">
                {data?.comments?.length || 0}
              </p>
            </div>
            {/* LIKE SECTION  */}
            <div className="flex items-center justify-center text-twitter-light-gray hover:text-[#F91880]">
              <button onClick={onLike}>
                {/* Conditional rendering of like button based on 'isLike' state */}
                {isLike ? (
                  <LoveIconFill style="w-9 h-9 fill-twitter-light-gray hover:fill-[#F91880] p-2 hover:bg-[#F91880] hover:bg-opacity-20 rounded-full" />
                ) : (
                  <LoveIcon style="w-9 h-9 fill-twitter-light-gray hover:fill-[#F91880] p-2 hover:bg-[#F91880] hover:bg-opacity-20 rounded-full" />
                )}
              </button>
              <p className="px-1 hover:text-twitter-light-gray">
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

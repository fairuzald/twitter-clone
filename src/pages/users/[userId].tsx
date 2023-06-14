import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useMemo } from "react";
import { format } from "date-fns";
import CalendarIcon from "@/components/icons/CalendarIcon";
import useEditModal from "@/hooks/useEditModals";
import EditModals from "@/components/modals/EditModals";
import PostFeed from "@/components/PostFeed";
import useFollow from "@/hooks/useFollow";
import LoginModals from "@/components/modals/LoginModals";
const UserDetails = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user } = useUser(userId as string);
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId as string);
  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    return format(new Date(user?.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);
  return (
    <>
      <Header showArrowButton label={user?.name} />
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col border-b border-twitter-border pb-6">
          {/* User Hero */}
          <div className="relative flex h-52 w-full bg-[#333639]">
            {user && user.coverImage && (
              <Image
                src={user.coverImage}
                alt={"Cover Image"}
                width="1920"
                height="1080"
                className="0bject-center h-full w-full overflow-hidden object-cover"
              />
            )}
            <div className="absolute -bottom-16 left-4">
              <Avatar userId={user?.id} size="large" isBorder />
            </div>
          </div>
          {/* User Bio */}
          <div className="flex w-full flex-col px-6 pt-2">
            {/* Follow Edit Button */}
            <div className="flex w-full justify-end">
              <div className="w-[100px]">
                {user?.id === currentUser?.id ? (
                  <>
                    <EditModals />
                    <Button color="white" onClick={editModal.onOpen}>
                      Edit
                    </Button>
                  </>
                ) : (
                  <>
                    <LoginModals />
                    <Button
                      color={isFollowing ? "trans-blue" : "white"}
                      onClick={toggleFollow}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                  </>
                )}
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col ">
              <h3 className="text-2xl font-semibold text-white">
                {user?.name}
              </h3>
              <p className="text-base text-neutral-500">@{user?.username}</p>
              {user?.bio && (
                <p className="text-base text-neutral-500">{user?.bio}</p>
              )}
              {/* Date Joined */}
              <div className="flex items-center gap-2">
                <CalendarIcon style="fill-neutral-500 w-4 h-4" />
                <p className="text-base text-neutral-500">Joined {createdAt}</p>
              </div>
              {/* Follow info */}
              <div className="flex items-center gap-5">
                <p className="flex gap-2 text-neutral-500">
                  <span className="text-white">
                    {user?.followingIds?.length}
                  </span>
                  Following
                </p>
                <p className="flex gap-2 text-neutral-500">
                  <span className="text-white">{user?.followersCount || 0}</span>
                  Followers
                </p>
              </div>
            </div>
          </div>
        </div>
        <PostFeed userId={user?.id as string} />
      </div>
    </>
  );
};

export default UserDetails;

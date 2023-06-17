import useEditModal from "@/hooks/useEditModals";
import React, { useMemo, useState } from "react";
import EditModals from "./modals/EditModals";
import Button from "./Button";
import LoginModals from "./modals/LoginModals";
import useFollow from "@/hooks/useFollow";
import CalendarIcon from "./icons/CalendarIcon";
import { format } from "date-fns";

interface UserBioProps {
  user: Record<any, string>;
  currentUser: Record<any, string>;
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ user, currentUser, userId }) => {
  // Custom hook for managing edit modals
  const editModal = useEditModal();

  // Custom hook for managing follow functionality
  const { isFollowing, toggleFollow } = useFollow(userId as string);

  const [isHovered, setIsHovered] = useState(false);

  // Format the user's creation date
  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    return format(new Date(user?.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  return (
    <div className="flex w-full flex-col px-5 lg:px-6 pt-4 lg:pt-7">
      {/* Follow/Edit Button */}
      <div className="flex w-full justify-end">
        <div className="w-[130px] lg:w-[135px]">
          {/* Show edit options if the user is the current user */}
          {user?.id === currentUser?.id ? (
            <>
              {/* Edit modals component */}
              <EditModals />
              <Button color="white" onClick={editModal.onOpen}>
                Edit
              </Button>
            </>
          ) : (
            <>
              {/* Login modals component */}
              <LoginModals />

              {/* Special button to add hover logic */}
              <button
                onClick={toggleFollow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex w-full items-center justify-center gap-4  ${
                  isFollowing
                    ? "border border-twitter-blue bg-transparent hover:border-twitter-red hover:bg-transparent hover:text-twitter-red"
                    : "bg-white text-black hover:bg-twitter-white-hover"
                } w-full rounded-full px-4 lg:px-5 py-1.5 lg:py-2 transition duration-300`}
              >
                <p className="block text-sm lg:text-base font-bold">
                  {isFollowing
                    ? isHovered
                      ? "Stop Follow"
                      : "Unfollow"
                    : "Follow"}
                </p>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 pt-3 lg:gap-2">
        {/* Identity */}
        <div>
          {/* Display user's name */}
          <h3 className="text-xl lg:text-2xl font-semibold text-white">{user?.name}</h3>

          {/* Display user's username */}
          <p className="text-sm lg:text-base text-twitter-light-gray">@{user?.username}</p>
        </div>

        {/* Display user's bio if available */}
        {user?.bio && (
          <p className="text-sm lg:text-base text-twitter-light-gray">{user?.bio}</p>
        )}

        {/* Date Joined */}
        <div className="flex items-center gap-2">
          <CalendarIcon style="fill-twitter-light-gray w-3 h-3 lg:w-4 lg:h-4" />
          <p className="text-sm lg:text-base text-twitter-light-gray">
            Joined {createdAt}
          </p>
        </div>

        {/* Follow info */}
        <div className="flex items-center gap-5 text-sm lg:text-base">
          <p className="flex gap-1.5 lg:gap-2 text-twitter-light-gray">
            {/* Display user's following count */}
            <span className="text-white">
              {user?.followingIds?.length || 0}
            </span>
            Following
          </p>
          <p className="flex gap-1.5 lg:gap-2 text-twitter-light-gray">
            {/* Display user's followers count */}
            <span className="text-white">{user?.followersCount || 0}</span>
            Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;

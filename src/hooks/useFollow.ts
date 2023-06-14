import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModals";

const useFollow = (userId: string) => {
  // Get the current user and its mutation function from the useCurrentUser hook
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  // Get the user data and its mutation function for the specified userId from the useUser hook
  const { mutate: mutateFetchedUser } = useUser(userId as string);

  // Get the login modal from the useLoginModal hook
  const loginModal = useLoginModal();

  // Determine if the current user is already following the specified userId
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  // Toggle the follow status for the specified userId
  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Define the request function based on the current follow status
    const request = isFollowing
      ? () => axios.delete(`/api/follow?userId=${userId}`)
      : () => axios.post("/api/follow", { userId });

    // Define the success message based on the current follow status
    const successMessage = isFollowing ? "Success unfollow" : "Success follow";

    // Send the request to the server and handle the response
    request()
      .then(() => {
        // Mutate the current user and fetched user data to update the UI
        mutateCurrentUser();
        mutateFetchedUser();
        toast.success(successMessage);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  // Return the isFollowing status and toggleFollow function as the result of the hook
  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;

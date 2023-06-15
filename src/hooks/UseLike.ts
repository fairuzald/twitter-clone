import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModals";
import usePosts from "./usePosts";
import usePost from "./usePost";

const useLike = ({ userId, postId }: { userId?: string; postId: string }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: posts, mutate: mutatePosts } = usePost(postId);
  const { mutate } = usePosts(userId as string);
  const loginModal = useLoginModal();

  const isLike = useMemo(() => {
    const list = posts?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser, posts]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const request = isLike
      ? () => axios.delete(`/api/like?postId=${postId}`)
      : () => axios.post("/api/like", { postId });

    const successMessage = isLike ? "Success unlike" : "Success like";

    request()
      .then(() => {
        mutate();
        mutatePosts();
        toast.success(successMessage);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }, [mutate, mutatePosts, loginModal, currentUser, postId, isLike]);

  return {
    isLike,
    toggleLike,
  };
};

export default useLike;

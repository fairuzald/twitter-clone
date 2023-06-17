import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import TextInput from "./TextInput";
import Button from "./Button";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { toast } from "react-hot-toast";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";

const FormTweet = ({
  postId,
  isComment,
  currentUser,
  isCurrentUserLoading,
  buttonText
}: {
  postId?: string;
  isComment?: boolean;
  currentUser?: Record<any, string>;
  isCurrentUserLoading?: boolean;
  buttonText: string;
}) => {
  const [body, setBody] = useState("");

  // Fetch posts and mutate them
  const { mutate: mutatePosts, isLoading: isLoadingPosts } = usePosts();

  // Fetch a specific post and mutate it
  const { mutate, isLoading: isLoadingPost } = usePost(postId as string);

  // State for loading spinner
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (body) {
        const url = isComment
          ? `/api/comment?postId=${postId}`
          : postId
          ? `/api/posts/${postId}`
          : "/api/posts";

        // Send POST request to the server
        await axios
          .post(url, { body })
          .then(() => {
            setIsLoading(true);
            toast.success(`${isComment ? "Comment" : "Post"} Uploaded`);

            // Mutate the post and posts data after successful upload
            mutate();
            mutatePosts();
            setBody("");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error uploading post");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [body, postId, mutate, mutatePosts, isComment]
  );

  return (
    <>
      {isLoadingPosts || isLoadingPost || isCurrentUserLoading || isLoading ? (
        // Show loading spinner while data is being fetched
        <div className="flex h-full w-full items-center justify-center">
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Render the form for creating a tweet
        <div className="flex w-full flex-col border-b-[1px] border-twitter-border px-4 py-4 lg:py-5">
          {/* CONTAINER */}
          <div className="flex justify-center gap-2 lg:gap-3">
            {/* AVATAR */}
            <Avatar
              userId={currentUser?.id as string}
              size="small"
              disabledLink
              isBorder
            />
            {/* FORM TWEET */}
            <form className="flex flex-1 flex-col gap-3 lg:gap-5">
              {/* Text Input field */}
              <TextInput
                value={body}
                setValue={setBody}
                placeholder="What's happening?"
                textarea
                required
              />
              <hr className="mx-auto w-[calc(100%-30px)] border-t-[1px] border-twitter-border opacity-100 transition peer-focus:opacity-80" />
              {/* Button Tweet */}
              <div className="flex w-full justify-end px-6">
                <div className="w-24 lg:w-28">
                  <Button
                    color="blue"
                    onClick={onSubmit}
                    disabled={isLoading || !body}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormTweet;

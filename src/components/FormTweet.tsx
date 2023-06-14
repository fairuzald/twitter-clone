import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import TextInput from "./TextInput";
import Button from "./Button";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { toast } from "react-hot-toast";
const FormTweet = ({ postId }: { postId?: string }) => {
  const [body, setBody] = useState("");
  const { mutate } = usePosts(postId as string);
  const { data: currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(() => {
    if (body) {
      axios
        .post(postId ? `/api/posts/${postId}` : "/api/posts", { body })
        .then(() => {
          setIsLoading(true);
          toast.success("Post Uploaded");
          mutate();
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
  }, [body, postId, mutate]);
  return (
    <div className="flex w-full flex-col gap-4 px-3 py-2">
      <div className="flex justify-center gap-3 ">
        <Avatar
          userId={currentUser?.id}
          size="small"
          disabledLink
          isBorder
        ></Avatar>
        <div className="flex flex-1 flex-col gap-5">
          <TextInput
            value={body}
            setValue={setBody}
            placeholder="What's happening?"
            textarea
            required
          />
          <hr className="mx-auto w-[calc(100%-30px)] border-[1px] border-twitter-border opacity-100 transition peer-focus:opacity-80" />
          <div className="flex w-full justify-end px-6">
            <div className="w-28">
              <Button
                color="blue"
                onClick={onSubmit}
                disabled={isLoading || !body}
              >
                Tweeet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTweet;

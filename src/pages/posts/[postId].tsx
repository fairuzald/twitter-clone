import CommentFeed from "@/components/CommentFeed";
import FormTweet from "@/components/FormTweet";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const { data: post, isLoading } = usePost(postId as string);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader
          color="#308CD8"
          loading={isLoading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <>
      <Header showArrowButton label="Tweet" />
      <PostItem data={post} />
      <CommentFeed comments={post?.comments} />
      <FormTweet postId={postId as string} isComment />
    </>
  );
};

export default PostDetail;

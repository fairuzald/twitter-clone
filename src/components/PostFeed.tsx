import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostFeed = ({ userId }: { userId?: string }) => {
  const { data: posts = [], isLoading } = usePosts(userId as string);
  const router = useRouter();

  return isLoading ? (
    <div className="flex min-h-[100vh-50px] h-full w-full items-center justify-center">
      <ClipLoader
        color="#308CD8"
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="flex flex-col">
      {posts.map((post: Record<any, string>) => (
        <button
          className="text-left"
          key={post.id}
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          <PostItem data={post} userId={userId} />
        </button>
      ))}
    </div>
  );
};

export default PostFeed;

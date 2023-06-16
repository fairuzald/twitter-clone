import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import { useRouter } from "next/router";

const PostFeed = ({ userId }: { userId?: string }) => {
  const { data: posts = [] } = usePosts(userId as string);
  const router = useRouter();
  return (
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

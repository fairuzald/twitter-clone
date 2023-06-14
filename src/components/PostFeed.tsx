import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

const PostFeed = ({ userId }: { userId?: string }) => {
  const { data: posts =[] } = usePosts(userId as string);
  return (
    <div className="flex flex-col">
      {posts.map((post: Record<any, string>) => (
        <PostItem key={post.id} data={post} userId={userId} />
      ))}
    </div>
  );
};

export default PostFeed;

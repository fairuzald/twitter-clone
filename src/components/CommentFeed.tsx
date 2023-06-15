import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({
  comments = [],
}: {
  comments?: Record<string, any>[];
}) => {
  return (
    <>
      {comments.map((comment:Record<string, any>) => (
        <CommentItem key={comment.id} data={comment}></CommentItem>
      ))}
    </>
  );
};

export default CommentFeed;

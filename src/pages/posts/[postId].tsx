import CommentFeed from "@/components/CommentFeed";
import FormTweet from "@/components/FormTweet";
import Header from "@/components/Header";
import PageHead from "@/components/PageHead";
import PostItem from "@/components/PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";


const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const { data: post, isLoading } = usePost(postId as string);
  const { data: currentUser } = useCurrentUser();
  const { data:sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && !sessionData) {
      toast.error("You must login to use");
      router.push("/login");
    }
  }, [router, status, sessionData]);

  return (
    <>
      <PageHead
        title={
          currentUser
            ? currentUser.name + "'s Post | Twitter CLone"
            : "Twitter Clone"
        }
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      {isLoading ? (
        <div className="flex h-screen m-auto items-center justify-center">
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Header showArrowButton label="Tweet" />
          <PostItem data={post} />
          <FormTweet
            postId={postId as string}
            isComment
            isCurrentUserLoading={isLoading}
            buttonText="Reply"
            currentUser={currentUser}
          />
          <CommentFeed comments={post?.comments} />
        </>
      )}
    </>
  );
};

export default PostDetail;

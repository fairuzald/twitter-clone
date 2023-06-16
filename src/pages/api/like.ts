import { prisma } from "@/server/db";
import serverAuth from "@/server/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { postId } = req.method === "POST" ? req.body : req.query;
    const { currentUser } = await serverAuth(req, res);
    if (!postId || typeof postId !== "string") {
      throw new Error("Post ID not provided");
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    let updatedLikedIds = [...(post.likedIds || [])];
    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);
        // NOTIFICATION PART START
        try {
          const post = await prisma.post.findUnique({
            where: {
              id: postId,
            }
          });
      
          if (post?.userId) {
            await prisma.notification.create({
              data: {
                body: 'Someone liked your tweet!',
                userId: post.userId
              }
            });
      
            await prisma.user.update({
              where: {
                id: post.userId
              },
              data: {
                hasNotification: true
              }
            });
          }
        } catch(error) {
          console.log(error);
        }
        // NOTIFICATION PART END
    }
    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }
    const updatedpost = await prisma.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds },
    });
    return res.status(200).json(updatedpost);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

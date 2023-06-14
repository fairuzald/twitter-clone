import { prisma } from "@/server/db";
import serverAuth from "@/server/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const { body } = req.body;
      if (!body) {
        return res.status(400).end();
      }
      const post = await prisma.post.create({
        data: { userId: currentUser.id, body },
      });
      res.status(200).json(post);
    }
    if (req.method === "GET") {
      const { userId } = req.query;
      let posts;
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).send(posts);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

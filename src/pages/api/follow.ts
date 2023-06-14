import type { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/server/serverAuth";
import { prisma } from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST and DELETE methods, return 405 (Method Not Allowed) for other methods
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    // Extract the userId from the request body or query, depending on the method
    const { userId } = req.method === "POST" ? req.body : req.query;

    // Authenticate the request and retrieve the current user from the serverAuth function
    const { currentUser } = await serverAuth(req, res);

    // Validate the userId parameter
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID type");
    }

    // Find the user with the given userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If the user does not exist, throw an error
    if (!user) {
      throw new Error("Invalid ID");
    }

    // Create a copy of the user's followingIds array, or an empty array if it's undefined
    let updatedFollowingIds = [...(user.followingIds || [])];

    // Update the followingIds array based on the request method
    if (req.method === "POST") {
      updatedFollowingIds.push(userId);
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    // Update the current user's followingIds array with the updatedFollowingIds
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    // Return the updated user data as JSON response
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

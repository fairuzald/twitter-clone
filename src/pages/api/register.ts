import { prisma } from "@/server/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

// The handler function takes two parameters: NextApiRequest and NextApiResponse.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is not POST. If so, return a 400 status code and end the response.
  if (req.method !== "POST") {
    return res.status(400).end();
  }

  try {
    // Extract the values from the request body: email, username, name, and password.
    const { email, username, name, password } = req.body;

    // Hash the password using bcrypt with a cost factor of 12.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database using the Prisma client.
    const user = await prisma.user.create({
      data: { email, username, name, hashedPassword },
    });

    // Return a 200 status code and the created user as a JSON response.
    return res.status(200).json(user);
  } catch (err) {
    // If an error occurs during the process, log the error and return a 400 status code.
    console.error(err);
    return res.status(400).end();
  }
}

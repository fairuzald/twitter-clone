import type { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/server/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is not GET. If so, return a 405 status code (Method Not Allowed) and end the response.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Call the `serverAuth` function to authenticate the request and retrieve the currentUser.
    const { currentUser } = await serverAuth(req);

    // Return a 200 status code and the currentUser as a JSON response.
    return res.status(200).json(currentUser);
  } catch (err) {
    // If an error occurs during the process, log the error and return a 400 status code.
    console.error(err);
    return res.status(400).end();
  }
}

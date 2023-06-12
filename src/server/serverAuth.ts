import type { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./db";

const serverAuth = async (req: NextApiRequest) => {
  // Use the `getSession` function from NextAuth.js to retrieve the user session based on the request.
  const session = await getSession({ req });

  // If the session does not exist or the user's email is not available in the session, throw an error indicating "Not signed in".
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Retrieve the current user from the database using the Prisma client, based on the user's email from the session.
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // If the currentUser does not exist, throw an error indicating "Not signed in".
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // Return the currentUser as the result of the authentication process.
  return { currentUser };
};

// Export the `serverAuth` function as the default export of this module.
export default serverAuth;

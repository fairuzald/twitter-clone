import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  }),
});

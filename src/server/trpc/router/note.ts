import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const noteRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),

  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ input, ctx }) => {
      const { title, content } = input;
      
      return ctx.prisma.note.create({
        data: {
          title,
          content,
        },
      });
    }),
})
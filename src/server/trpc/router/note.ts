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

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
      }))
    .mutation(({ input, ctx }) => {
      const { id, title, content } = input;
      
      return ctx.prisma.note.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id } = input;
      
      return ctx.prisma.note.delete({
        where: { id },
      });
    }),
})
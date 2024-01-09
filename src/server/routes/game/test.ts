import { protectedProcedure } from "@/server/trpc";

export const test = protectedProcedure.query(async (opts) => {
  console.log("ctx:", opts.ctx);

  return { userId: opts.ctx.userId };
});

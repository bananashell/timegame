import { initTRPC, TRPCError } from "@trpc/server";
import { createInnerTRPCContext } from "./context";
import superjson from "superjson";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.context<typeof createInnerTRPCContext>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use((opts) => {
  console.log("protectedProcedure opts:", opts);
  console.log("protectedProcedure opts.ctx.req:", opts.ctx.req);
  return opts.next({
    ctx: {
      userId: "",
      req: opts.ctx.req,
      res: opts.ctx.res,
    },
  });
});

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCaller = t.createCallerFactory;

import { initTRPC, TRPCError } from "@trpc/server";
import { createInnerTRPCContext } from "./context";
import superjson from "superjson";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.context<{}>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const baseProcedure = t.procedure;

console.log("t.createCallerFactory", t.createCallerFactory);

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */

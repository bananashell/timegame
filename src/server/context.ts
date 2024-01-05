import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export interface CreateInnerContextOptions
  extends Partial<CreateNextContextOptions> {
  userId?: string;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createSSGHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
  return {
    ...opts,
    userId: opts?.userId,
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export const createTRPCContext = async (opts?: CreateNextContextOptions) => {
  const acceptLanguage = opts?.req.headers["accept-language"];
  // If you store locales on User in DB, you can use that instead
  // We use the accept-language header to determine the locale here.
  const locale = acceptLanguage?.includes("en") ? "en" : "sv";

  const innerContext = await createInnerTRPCContext({
    req: opts?.req,
    userId: opts?.req.cookies.userId,
  });

  return {
    ...innerContext,
    req: opts?.req,
  };
};

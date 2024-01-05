"use server";

import { createServerSideHelpers } from "@trpc/react-query/server";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter, appRouter } from "@/server";

import superjson from "superjson";
import { createCaller } from "@/server/trpc";
import { createTRPCContext } from "@/server/context";

function getBaseUrl() {
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createServerSideHelpers({
  router: appRouter,
  ctx: await createTRPCContext(),
  transformer: superjson,
});

// export const trpc = createCaller(appRouter)({
//   config() {
//     return {
//       transformer: superjson,
//       links: [
//         loggerLink({
//           enabled: (opts) =>
//             process.env.NODE_ENV === "development" ||
//             (opts.direction === "down" && opts.result instanceof Error),
//         }),
//         httpBatchLink({
//           /**
//            * If you want to use SSR, you need to use the server's full URL
//            * @link https://trpc.io/docs/ssr
//            **/
//           url: `${getBaseUrl()}/api/trpc`,

//           // You can pass any HTTP headers you wish here
//           async headers() {
//             return {
//               // authorization: getAuthCookie(),
//             };
//           },
//         }),
//       ],
//     };
//   },
// });

// export const trpc = appRouter.createCaller({
//   links: [
//     httpBatchLink({
//       /**
//        * If you want to use SSR, you need to use the server's full URL
//        * @link https://trpc.io/docs/ssr
//        **/
//       url: `${getBaseUrl()}/api/trpc`,

//       // You can pass any HTTP headers you wish here
//       async headers() {
//         return {
//           // authorization: getAuthCookie(),
//         };
//       },
//     }),
//   ],
// });

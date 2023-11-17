// import { httpBatchLink } from "@trpc/client";

// import { appRouter } from "@/server";

// export const serverClient = appRouter.createCaller({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3000/api/trpc",
//     }),
//   ],
// });
import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = appRouter.createCaller({
  links: [
    httpBatchLink({
      /**
       * If you want to use SSR, you need to use the server's full URL
       * @link https://trpc.io/docs/ssr
       **/
      url: `${getBaseUrl()}/api/trpc`,

      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});

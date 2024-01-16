import { createTRPCNext } from "@trpc/next";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { type AppRouter } from "@/server";

// export const trpcNext = createTRPCNext<AppRouter>({
//   config() {
//     return config;
//   },
// });

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
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

function getBaseUrl() {
  return "";
}

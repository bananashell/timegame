import { createTRPCNext } from "@trpc/next";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { type AppRouter } from "@/server";

const config = {
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
};

// export const trpcNext = createTRPCNext<AppRouter>({
//   config() {
//     return config;
//   },
// });
export const trpc = createTRPCProxyClient<AppRouter>(config);

function getBaseUrl() {
  return "";
}

import { createTRPCReact } from "@trpc/react-query";
import { createTRPCProxyClient, httpBatchLink, wsLink } from "@trpc/client";

import { type AppRouter } from "@/server";

export const trpc = createTRPCProxyClient<AppRouter>({
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

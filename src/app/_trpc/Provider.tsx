// "use client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { httpBatchLink } from "@trpc/client";
// import React, { useState } from "react";

// import { trpc } from "./client";

// export default function Provider({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: { suspense: false, refetchOnWindowFocus: false },
//         },
//       }),
//   );
//   const [trpcClient] = useState(() => trpc);
//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </trpc.Provider>
//   );
// }

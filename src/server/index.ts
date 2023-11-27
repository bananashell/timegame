import { z } from "zod";
import { procedure, router } from "./trpc";
import { historicEventsRouter } from "./routes/historicEvents";

export const appRouter = router({
  ...historicEventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

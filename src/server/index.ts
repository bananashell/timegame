import { procedure, router } from "./trpc";
import { historicEventsRouter } from "./routes/historicEvents";
import { gameRouter } from "./routes/score";

export const appRouter = router({
  ...historicEventsRouter,
  ...gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { router } from "./trpc";
// import { historicEventsRouter } from "./routes/historicEventsRouter";
import { gameRouter } from "./routes/game";

export const appRouter = router({
  // ...historicEventsRouter,
  ...gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { procedure } from "@/server/trpc";
import { getHistoricEvents } from "@/server/service/historicEventService";
import { z } from "zod";

export const historicEventsRouter = {
  historicEvents: procedure
    .input(
      z.object({
        salt: z.string(),
        cursor: z.string().uuid().optional(),
        pageSize: z.number(),
      }),
    )
    .query((opts) => {
      return getHistoricEvents({ ...opts.input });
    }),
};

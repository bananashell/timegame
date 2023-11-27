import { procedure } from "@/server/trpc";
import { getHistoricEvents } from "@/server/service/historicEventService";
import { z } from "zod";
import { startNewGame } from "@/server/service/gameService";

export const gameRouter = {
  startNew: procedure.mutation((opts) => {
    return startNewGame();
  }),
};

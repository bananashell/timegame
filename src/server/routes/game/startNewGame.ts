import { GameEntity } from "@/data/db/game/gameEntity";
import { createNewGameEntity } from "@/data/db/game/repository/createNewGame";
import { HistoricEvent } from "@/models/historicEvent";
import { getNextHistoricEvent } from "@/server/service/historicEventService";
import { generateRandomSalt } from "@/server/service/saltService";
import { baseProcedure } from "@/server/trpc";
import { z } from "zod";

const startNewGameInput = z.object({
  userId: z.string().uuid(),
  username: z.string().min(1).max(255),
});

export const startNewGame = baseProcedure
  .input(startNewGameInput)
  .mutation(
    async ({
      input,
    }): Promise<{ game: GameEntity; nextEvent: HistoricEvent }> => {
      console.log("Start new game");
      const salt = await generateRandomSalt();
      console.log("Salt", salt);
      const entity = await createNewGameEntity({
        salt: salt,
        userId: input.userId,
        username: input.username,
      });

      const nextEvent = await getNextHistoricEvent({
        salt: salt,
        cursor: undefined,
      });

      return { game: entity, nextEvent: nextEvent };
    },
  );

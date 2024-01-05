import { GameEntity } from "@/data/db/game/gameEntity";
import { gameId } from "@/data/db/game/gameId";
import { getGame as _getGame } from "@/data/db/game/repository";
import { HistoricEvent } from "@/models/historicEvent";
import { getNextHistoricEvent } from "@/server/service/historicEventService";
import { baseProcedure } from "@/server/trpc";
import { z } from "zod";

const startNewGameInput = z.object({
  salt: z.string(),
});

export const getGame = baseProcedure
  .input(startNewGameInput)
  .query(
    async ({
      input,
      ctx,
    }): Promise<{ game: GameEntity; nextEvent: HistoricEvent }> => {
      if (ctx.userId === undefined) throw new Error("User not logged in");

      const entity = await _getGame(
        gameId({ salt: input.salt, userId: ctx.userId }),
      );
      if (!entity.exists) throw new Error("Game not found");

      const nextEvent = await getNextHistoricEvent({
        salt: input.salt,
        cursor: entity.data.events.at(-1)?.id,
      });

      return { game: entity.data, nextEvent: nextEvent };
    },
  );

import { GameEvent } from "@/data/GameEvent";
import { GameEntity } from "@/data/db/game/gameEntity";
import { createNewGameEntity } from "@/data/db/game/repository/createNewGame";
import { gameTypes } from "@/gameEngine/gameState";
import { getNextGameEvent } from "@/server/service/gameEventService";
import { generateDateSalt } from "@/server/service/saltService";
import { procedure } from "@/server/trpc";
import { z } from "zod";

const startNewGameInput = z.object({
  userId: z.string().uuid(),
  username: z.string().min(1).max(255),
  gameType: gameTypes,
});

export const startNewGame = procedure
  .input(startNewGameInput)
  .mutation(
    async ({ input }): Promise<{ game: GameEntity; nextEvent: GameEvent }> => {
      const salt = await generateDateSalt();

      const entity = await createNewGameEntity({
        salt: salt,
        userId: input.userId,
        username: input.username,
        gameType: input.gameType,
      });

      const nextEvent = await getNextGameEvent({
        salt: salt,
        cursor: entity.events[entity.events.length - 1]?.id,
        gameType: entity.gameType,
      });

      if (!nextEvent) {
        console.error("No next event");
        throw new Error("No next event");
      }

      return { game: entity, nextEvent: nextEvent };
    },
  );

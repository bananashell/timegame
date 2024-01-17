import { GameEntity } from "@/data/db/game/gameEntity";
import { createNewGameEntity } from "@/data/db/game/repository/createNewGame";
import { HistoricEvent } from "@/models/historicEvent";
import { getNextHistoricEvent } from "@/server/service/historicEventService";
import { generateRandomSalt } from "@/server/service/saltService";
import { procedure } from "@/server/trpc";
import { z } from "zod";

const startNewGameInput = z.object({
  userId: z.string().uuid(),
  username: z.string().min(1).max(255),
});

export const startNewGame = procedure
  .input(startNewGameInput)
  .mutation(
    async ({
      input,
    }): Promise<{ game: GameEntity; nextEvent: HistoricEvent }> => {
      console.log("Start new game");
      // const salt = await generateRandomSalt();
      const salt = (await getCurrentDateOnly()).getTime().toString(16);

      console.log("Salt", salt);
      const entity = await createNewGameEntity({
        salt: salt,
        userId: input.userId,
        username: input.username,
      });

      const nextEvent = await getNextHistoricEvent({
        salt: salt,
        cursor: entity.events[entity.events.length - 1]?.id,
      });

      return { game: entity, nextEvent: nextEvent };
    },
  );

function getCurrentDateOnly() {
  // Get the current date
  const currentDate = new Date();

  // Extract year, month, and day from the current date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // Create a new Date object with the extracted values
  const dateOnly = new Date(year, month, day);

  return dateOnly;
}

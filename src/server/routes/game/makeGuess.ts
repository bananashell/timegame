import { baseProcedure } from "@/server/trpc";
import { emitEvent } from "../../eventEmitter";
import { makeGuessInput } from "@/data/db/game/repository";
import { makeGuess as _makeGuess } from "@/data/db/game/repository/makeGuess";
import { getNextHistoricEvent } from "@/server/service/historicEventService";

export const makeGuess = baseProcedure
  .input(makeGuessInput)
  .mutation(async (opts) => {
    console.log("Make guess", opts.input);

    const result = await _makeGuess(opts.input);
    emitEvent("guess made", opts.input);
    console.log("Guess made -> ", result);

    // Get next event
    const lastId = result.events.at(-1)?.id;
    if (!lastId) throw new Error("No cursor");

    const nextEvent = await getNextHistoricEvent({
      salt: opts.input.salt,
      cursor: lastId,
    });

    return { gameState: result, nextEvent: nextEvent };
  });

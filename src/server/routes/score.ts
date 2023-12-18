import { procedure } from "@/server/trpc";
import { emitEvent } from "../eventEmitter";
import { GameInput, upsertGame } from "@/data/db/gameRepository";

export const gameRouter = {
  upsertGame: procedure.input(GameInput).mutation(async (opts) => {
    console.log("Update game", opts.input);

    await upsertGame(opts.input);
    emitEvent("upsertGame", opts.input);
  }),
};

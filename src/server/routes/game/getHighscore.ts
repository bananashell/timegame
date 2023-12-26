import { procedure } from "@/server/trpc";
import { getHighscoreInput } from "@/data/db/game/repository";
import { getHighscore as _getHighscore } from "@/data/db/game/repository/getHighscore";

export const getHighscore = procedure
  .input(getHighscoreInput)
  .query(async (opts) => {
    console.log("Find game", opts.input);
    return _getHighscore(opts.input);
  });

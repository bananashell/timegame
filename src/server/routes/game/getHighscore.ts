import { procedure } from "@/server/trpc";
import { getHighscoreInput } from "@/data/db/game/repository";
import {
  getHighscore as _getHighscore,
  getOverallHighscore as _getOverallHighscore,
} from "@/data/db/game/repository/highscore";

export const getHighscore = procedure
  .input(getHighscoreInput)
  .query(async (opts) => {
    return _getHighscore(opts.input);
  });

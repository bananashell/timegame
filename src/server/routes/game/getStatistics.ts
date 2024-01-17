import { procedure } from "@/server/trpc";
import {
  getStatisticsInput,
  getStatistics as _getStatistics,
} from "@/data/db/game/repository";

export const getStatistics = procedure
  .input(getStatisticsInput)
  .query(async (opts) => {
    return _getStatistics(opts.input);
  });

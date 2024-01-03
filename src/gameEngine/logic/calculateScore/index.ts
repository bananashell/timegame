import { Year, LockedHistoricGameEvent } from "@/gameEngine/gameState";
import { HistoricEvent } from "@/models/historicEvent";
import { isInTimespan } from "./isInTimespan";

export type ScoredHistoricEvent = Pick<
  LockedHistoricGameEvent,
  "year" | "score"
>;
export type CurrentEvent = Pick<HistoricEvent, "year">;

export const FIVE_POINT_DIFF_CUTOFF = 10 as const;
export const SCORES = {
  MAXIMUM_SCORE: 10 as const,
  SMALL_DIFF_SCORE: 5 as const,
  LARGE_DIFF_SCORE: 1 as const,
  FIRST_GUESS_SCORE: 1 as const,
};

/**
 * Calculates the score for the current historic events guess.
 * @example
 * 10 points for being completely correct
 * 5 points for being in the correct timespan and +/- 10 years away
 * 1 point for being in the correct timespan
 * 0 points for the first guess unless completely correct
 * false if the guess is wrong
 * @param gameState
 */
export const calculateScore = (args: {
  historicEvents: ScoredHistoricEvent[];
  currentEvent: CurrentEvent;
  guess: Year;
}): false | number => {
  if (typeof args.guess != "number")
    throw new Error("Guess has to be a number");

  if (args.currentEvent.year === args.guess) return SCORES.MAXIMUM_SCORE;
  if (args.historicEvents.length === 0) return SCORES.FIRST_GUESS_SCORE;

  const inTimespan = isInTimespan(args);
  if (!inTimespan) {
    return false;
  }

  if (Math.abs(args.currentEvent.year - args.guess) <= FIVE_POINT_DIFF_CUTOFF) {
    return SCORES.SMALL_DIFF_SCORE;
  }

  return SCORES.LARGE_DIFF_SCORE;
};

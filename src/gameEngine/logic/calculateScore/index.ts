import { Year, LockedHistoricGameEvent } from "@/gameEngine/gameState";
import { HistoricEvent } from "@/models/historicEvent";
import { isInTimespan } from "./isInTimespan";

export type ScoredHistoricEvent = Pick<
  LockedHistoricGameEvent,
  "year" | "score"
>;
export type CurrentEvent = Pick<HistoricEvent, "year">;

const SCORES = {
  ABSOLUTELY_CORRECT: 20 as const,
  MAXIMUM_SCORE: 10 as const,
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

  if (args.currentEvent.year === args.guess) return SCORES.ABSOLUTELY_CORRECT;

  const inTimespan = isInTimespan(args);
  if (!inTimespan) {
    return false;
  }

  const diff = Math.abs(args.currentEvent.year - args.guess);
  const score = Math.max(SCORES.MAXIMUM_SCORE - diff, 1);

  return score;
};

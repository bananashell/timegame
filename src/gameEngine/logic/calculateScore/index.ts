import { Year, LockedGameEvent } from "@/gameEngine/gameState";
import type { GameEvent } from "@/data/GameEvent";
import { isInTimespan } from "./isInTimespan";

export type ScoredGameEvent = Pick<LockedGameEvent, "year" | "score">;
export type CurrentEvent = Pick<GameEvent, "year">;

const SCORES = {
  ABSOLUTELY_CORRECT: 20 as const,
  MAXIMUM_SCORE: 10 as const,
};

/**
 * Calculates the score for the current historic events guess.
 * @example
 * 20 points for being completely correct
 * 10 - difference in guess and answer results in the same amount of points
 * 1 point for being in the correct timespan
 * false if the guess is wrong
 * @param gameState
 */
export const calculateScore = (args: {
  historicEvents: ScoredGameEvent[];
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
  const score = Math.max(SCORES.MAXIMUM_SCORE - (diff - 1), 1);

  return score;
};

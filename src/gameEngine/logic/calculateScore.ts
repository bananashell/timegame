import { RootState } from "@/gameEngine/gameState";

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
export const calculateScore = (gameState: RootState): false | number => {
  if (!gameState.currentEvent?.guess)
    throw new Error("Current event is not defined");

  if (gameState.currentEvent.year === gameState.currentEvent.guess)
    return SCORES.MAXIMUM_SCORE;
  if (gameState.timelineEvents.length === 0) return SCORES.FIRST_GUESS_SCORE;

  const inTimespan = isInTimespan(gameState);
  if (!inTimespan) {
    return false;
  }

  if (
    Math.abs(gameState.currentEvent.year - gameState.currentEvent.guess) <=
    FIVE_POINT_DIFF_CUTOFF
  ) {
    return SCORES.SMALL_DIFF_SCORE;
  }

  return SCORES.LARGE_DIFF_SCORE;
};

const isInTimespan = (gameState: RootState): boolean => {
  if (!gameState.currentEvent) {
    throw new Error("Current event is not defined");
  }

  const orderedTimelineEvents = gameState.timelineEvents.sort(
    (a, b) => a.year - b.year,
  );

  for (let i = 0; i < orderedTimelineEvents.length; i++) {
    const current = orderedTimelineEvents.at(i)!;
    const next = orderedTimelineEvents.at(i + 1);

    if (
      i == 0 &&
      current.year > gameState.currentEvent.year &&
      current.year > gameState.currentEvent.guess
    ) {
      return true;
    }

    if (
      current.year <= gameState.currentEvent.year &&
      current.year <= gameState.currentEvent.guess &&
      (!next || next.year >= gameState.currentEvent.year)
    ) {
      return true;
    }
  }

  return false;
};

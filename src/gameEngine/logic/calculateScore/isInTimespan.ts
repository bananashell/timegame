import { Year } from "@/gameEngine/gameState";
import { ScoredGameEvent, CurrentEvent } from ".";

export const isInTimespan = ({
  historicEvents,
  currentEvent,
  guess,
}: {
  historicEvents: ScoredGameEvent[];
  currentEvent: CurrentEvent;
  guess: Year;
}): boolean => {
  if (typeof guess != "number") throw new Error("Guess has to be a number");

  const answer = currentEvent.year;

  const orderedTimeline = [
    ...new Set([...historicEvents.map((x) => x.year), answer, guess]),
  ].sort((a, b) => a - b);

  const answerIndex = orderedTimeline.indexOf(answer);
  const guessIndex = orderedTimeline.indexOf(guess);

  return Math.abs(answerIndex - guessIndex) === 1;
};

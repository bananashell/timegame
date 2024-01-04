import { produce } from "immer";
import { RootState, HistoricGameEvent, Year } from "@/gameEngine/gameState";
import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { HistoricEvent } from "@/models/historicEvent";
import { gameId } from "@/data/db/game/gameId";

export const createNewGame = ({
  salt,
  username,
  userId,
}: {
  salt: string;
  username: string;
  userId: string;
}): RootState => {
  return {
    id: gameId({ salt: salt, userId: userId }),
    gameState: { mainState: "playing", subState: "guessing" },
    timelineEvents: [],
    currentEvent: undefined,
    salt: salt,
    userId: userId,
    username: username,
  };
};

export const nextHistoricEvent = (
  state: RootState,
  next: HistoricEvent,
  afterNext?: HistoricEvent,
): RootState => {
  return produce(state, (draft) => {
    draft.currentEvent = { ...next, guess: 1900 };
    draft.nextEvent = afterNext;

    return draft;
  });
};

const currentYear = new Date().getFullYear();
export const guess = (state: RootState, year: Year) => {
  return produce(state, (draft) => {
    if (draft.gameState.mainState != "playing") {
      throw new Error("Must be playing to be able to guess");
    }

    if (!draft.currentEvent) {
      throw new Error("No current event to add guess to");
    }

    draft.currentEvent.guess = Math.min(year, currentYear);
  });
};

export const lock = (state: RootState): RootState => {
  return produce(state, (draft) => {
    if (draft.gameState.mainState != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    if (!draft.currentEvent) throw new Error("No current event to lock");

    const score = calculateScore({
      currentEvent: draft.currentEvent,
      guess: draft.currentEvent.guess,
      historicEvents: draft.timelineEvents,
    });
    if (score === false) {
      // GAME END
      draft.gameState = { mainState: "game over", subState: "score screen" };
      return;
    }

    const newTimeline = [
      ...draft.timelineEvents,
      { ...draft.currentEvent!, score: score },
    ];

    draft.timelineEvents = newTimeline;
  });
};

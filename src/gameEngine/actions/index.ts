import { produce } from "immer";
import { GameState, HistoricGameEvent, Year } from "@/gameEngine/gameState";
import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { HistoricEvent } from "@/models/historicEvent";

export const createNewGame = (salt: string): GameState => {
  return {
    state: "playing",
    timelineEvents: [],
    currentEvent: undefined,
    salt: salt,
  };
};

export const nextHistoricEvent = (
  state: GameState,
  next: HistoricEvent,
  afterNext?: HistoricEvent,
): GameState => {
  return produce(state, (draft) => {
    draft.state = "playing";
    draft.currentEvent = { ...next, guess: 1900 };
    draft.nextEvent = afterNext;

    return draft;
  });
};

const currentYear = new Date().getFullYear();
export const guess = (state: GameState, year: Year) => {
  return produce(state, (draft) => {
    if (draft.state != "playing") {
      throw new Error("Must be playing to be able to guess");
    }

    if (!draft.currentEvent) {
      throw new Error("No current event to add guess to");
    }

    draft.currentEvent.guess = Math.min(year, currentYear);
  });
};

export const lock = (state: GameState): GameState => {
  return produce(state, (draft) => {
    if (draft.state != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    const score = calculateScore(draft);
    if (score === false) {
      // GAME END
      draft.state = "game over";
      return;
    }

    const newTimeline = [
      ...draft.timelineEvents,
      { ...draft.currentEvent!, score: score },
    ];

    draft.timelineEvents = newTimeline;
  });
};

import { produce } from "immer";
import { GameState, HistoricGameEvent, Year } from "@/gameEngine/gameState";

export const createNewGame = (): GameState => {
  return {
    state: "game start",
    timelineEvents: [],
    currentEvent: undefined,
  };
};

export const addNewHistoricEvent = (
  state: GameState,
  historicEvent: HistoricGameEvent,
): GameState => {
  return produce(state, (draft) => {
    draft.state = "playing";
    draft.currentEvent = historicEvent;
  });
};

export const guess = (state: GameState, year: Year) => {
  return produce(state, (draft) => {
    if (draft.state != "playing") {
      throw new Error("Must be playing to be able to guess");
    }

    if (!draft.currentEvent) {
      throw new Error("No current event to add guess to");
    }

    draft.currentEvent.guess = year;
  });
};

export const lock = (
  state: GameState,
  historicEvent: HistoricGameEvent,
): GameState => {
  return produce(state, (draft) => {
    if (draft.state != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    draft.currentEvent = historicEvent;
  });
};

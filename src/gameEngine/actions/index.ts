import { produce } from "immer";
import { GameType, RootState, Year } from "@/gameEngine/gameState";
import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { HistoricEvent } from "@/data/historicEvents/historicEvent";
import { GameId } from "@/data/db/game/gameId";

export const createNewGame = ({
  salt,
  username,
  userId,
  gameType,
}: {
  salt: string;
  username: string;
  userId: string;
  gameType: GameType;
}): RootState => {
  return {
    id: new GameId({ salt: salt, userId: userId }).toString(),
    gameType: gameType,
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

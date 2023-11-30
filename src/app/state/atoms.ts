import { GameState } from "@/gameEngine/gameState";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export const gameStateAtom = atom<GameState>({
  timelineEvents: [],
  salt: "",
  state: "game start",
});
gameStateAtom.debugLabel = "gameStateAtom";

export const saltAtom = focusAtom(gameStateAtom, (optic) => optic.prop("salt"));
saltAtom.debugLabel = "salt";

export const currentEventAtom = focusAtom(gameStateAtom, (optic) =>
  optic.prop("currentEvent"),
);
currentEventAtom.debugLabel = "currentEventAtom";
export const nextEventAtom = focusAtom(gameStateAtom, (optic) =>
  optic.prop("nextEvent"),
);
nextEventAtom.debugLabel = "nextEventAtom";

export const timelineEventsAtom = focusAtom(gameStateAtom, (optic) =>
  optic.prop("timelineEvents"),
);
timelineEventsAtom.debugLabel = "timelineEventsAtom";

export const orderedTimelineEvents = atom((get) =>
  get(timelineEventsAtom).sort((a, b) => a.year - b.year),
);
orderedTimelineEvents.debugLabel = "orderedTimelineEvents";

export const scoreAtom = atom((get) =>
  get(timelineEventsAtom).reduce((acc, curr) => {
    return acc + curr.score;
  }, 0),
);
scoreAtom.debugLabel = "scoreAtom";

export const stateAtom = focusAtom(gameStateAtom, (optic) =>
  optic.prop("state"),
);
stateAtom.debugLabel = "stateAtom";

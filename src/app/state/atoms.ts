"use client";

import { RootState } from "@/gameEngine/gameState";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

const getFromLocalStorage = (key: string) => {
  if (typeof global.localStorage?.getItem !== "function") return undefined;

  return global.localStorage.getItem(key);
};

export const rootStateAtom = atom<RootState>({
  id: "",
  timelineEvents: [],
  salt: "",
  gameState: { mainState: "game start", subState: undefined },
  username: getFromLocalStorage("username") ?? "",
  userId: undefined,
});
rootStateAtom.debugLabel = "gameStateAtom";

export const usernameAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("username"),
);
usernameAtom.debugLabel = "username";

export const userIdAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("userId"),
);
userIdAtom.debugLabel = "userId";

export const saltAtom = focusAtom(rootStateAtom, (optic) => optic.prop("salt"));
saltAtom.debugLabel = "salt";

export const currentEventAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("currentEvent"),
);
currentEventAtom.debugLabel = "currentEventAtom";
export const nextEventAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("nextEvent"),
);
nextEventAtom.debugLabel = "nextEventAtom";

export const timelineEventsAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("timelineEvents"),
);
timelineEventsAtom.debugLabel = "timelineEventsAtom";

export const orderedTimelineEvents = atom((get) =>
  get(timelineEventsAtom).sort((a, b) => b.year - a.year),
);
orderedTimelineEvents.debugLabel = "orderedTimelineEvents";

export const scoreAtom = atom((get) =>
  get(timelineEventsAtom).reduce((acc, curr) => {
    return acc + curr.score;
  }, 0),
);
scoreAtom.debugLabel = "scoreAtom";

export const stateAtom = focusAtom(rootStateAtom, (optic) =>
  optic.prop("gameState"),
);
stateAtom.debugLabel = "stateAtom";

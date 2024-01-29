"use client";

import { RootState } from "@/gameEngine/gameState";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { v4 as uuidv4 } from "uuid";

const getFromLocalStorage = (key: string) => {
  if (typeof global.localStorage?.getItem !== "function") return undefined;

  return global.localStorage.getItem(key);
};

const userId = () => {
  if (process.env.NODE_ENV === "development") {
    return "00000000-0000-0000-0000-000000000000";
  }

  const userId = getFromLocalStorage("userId");
  if (userId) {
    return userId;
  }

  const newUserId = uuidv4();
  if (global.localStorage) {
    global.localStorage.setItem("userId", newUserId);
  }

  return newUserId;
};

export const rootStateAtom = atom<RootState>({
  id: "",
  timelineEvents: [],
  salt: "",
  gameState: { mainState: "game start", subState: undefined },
  username: getFromLocalStorage("username") ?? "",
  userId: userId(),
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

export const surroundingYearsAtom = atom((get) => {
  const events = get(orderedTimelineEvents);
  const currentEvent = get(currentEventAtom);

  if (!currentEvent) {
    return { eventBefore: undefined, eventAfter: undefined };
  }

  let years = [...new Set([...events.map((x) => x.year), currentEvent.guess])];
  years = years.sort((a, b) => a - b);

  const currentEventIndex = years.indexOf(currentEvent.guess);

  const eventBefore = years[currentEventIndex - 1] || events?.at(-1)?.year;
  const eventAfter = years[currentEventIndex + 1];

  return { eventBefore: eventBefore, eventAfter: eventAfter };
});

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

import { z } from "zod";
import { historicEvents } from "./historicEvents/historicEvents";
import { musicEvents } from "./music/musicEvents";
import { historicEvent } from "./historicEvents/historicEvent";
import { musicEvent } from "./music/musicEvent";
import type { GameEvent } from "./GameEvent";

const _id = z.string().uuid();
type Id = z.infer<typeof _id>;

const gameEvents = [...musicEvents, ...historicEvents] as const;

export const getGameEvent = (id: Id) => {
  id = _id.parse(id);

  const event = gameEvents.find((event) => event.id === id);
  if (!event) {
    throw new Error(`Event with id ${id} not found`);
  }

  return parsers[event.type](event);
};

const parsers: {
  [key in GameEvent["type"]]: (event: (typeof gameEvents)[number]) => GameEvent;
} = {
  historic: (event) => historicEvent.parse(event),
  music: (event) => musicEvent.parse(event),
};

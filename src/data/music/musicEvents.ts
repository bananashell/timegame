import MusicEvents from "./musicEvents.json";
import z from "zod";
import { musicEvent } from "./musicEvent";

const parsedmusicEvents = z.array(musicEvent).safeParse(MusicEvents);

export const musicEvents = parsedmusicEvents.success
  ? parsedmusicEvents.data
  : [];

const _id = z.string().uuid();
type Id = z.infer<typeof _id>;

export const getmusicEvent = (id: Id) => {
  id = _id.parse(id);

  const event = musicEvents.find((event) => event.id === id);
  return musicEvent.parse(event);
};

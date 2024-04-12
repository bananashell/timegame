import type { MusicEvent } from "../src/data/music/musicEvent";
import data from "../src/data/music/musicEvents.json";
import { write } from "bun";

export async function addNewMusicEvent(newEvent: MusicEvent) {
  const existingEvent = data.find((x) => x.spotifyId === newEvent.spotifyId);
  if (existingEvent) {
    console.error("Event already exists", existingEvent);
    return;
  }

  data.push(newEvent);

  await write("../src/data/music/musicEvents.json", JSON.stringify(data));

  return newEvent;
}

import { describe, expect, it } from "bun:test";
import { musicEvent } from "./musicEvent";
import MusicEvents from "./musicEvents.json";

const historicEventMap = MusicEvents.map((event) => [event.title, event]);

describe("musicEvents", () => {
  describe("parses data correctly", () => {
    it.each(historicEventMap)("'%s'", (_, eventData) => {
      const parseResult = musicEvent.safeParse(eventData);
      expect((parseResult as any)["error"]).toBeFalsy();
      expect(parseResult.success).toBeTrue();
    });
  });

  it("contains unique ids", () => {
    MusicEvents.forEach((event) => {
      expect(musicEvent.parse(event).id).toEqual(event.id);
    });
    const ids = new Set(MusicEvents.map((event) => event.id));
    expect(ids.size).toEqual(MusicEvents.length);
  });

  it("contains unique spotify ids", () => {
    MusicEvents.forEach((event) => {
      expect(musicEvent.parse(event).spotifyId).toEqual(event.spotifyId);
    });
    const ids = new Set(MusicEvents.map((event) => event.spotifyId));
    expect(ids.size).toEqual(MusicEvents.length);
  });
});

import { getNextMusicEvent } from "./index";
import { musicEvents } from "@/data/music/musicEvents";
import { describe, it, expect } from "bun:test";

describe("getNextMusicEvent", () => {
  const salt = "testSalt";
  const totalEvents = musicEvents.length;
  it("should be able to get all events without any duplicates", async () => {
    const fetchedEvents = [];
    while (true) {
      const event = await getNextMusicEvent({
        salt,
        cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
      });
      fetchedEvents.push(event);

      if (fetchedEvents.length === totalEvents) {
        break;
      }
    }

    const ids = new Set(fetchedEvents.map((event) => event.id));
    expect(ids.size).toEqual(totalEvents);
  });

  it("should get the same event every time with the same salt", async () => {
    const event1 = await getNextMusicEvent({ salt, cursor: null });
    const event2 = await getNextMusicEvent({ salt, cursor: null });
    expect(event1).toEqual(event2);
  });

  it("next event should be the same every time", async () => {
    const firstEvent = await getNextMusicEvent({ salt, cursor: null });
    const event1 = await getNextMusicEvent({ salt, cursor: firstEvent.id });
    const event2 = await getNextMusicEvent({ salt, cursor: firstEvent.id });
    expect(event1).toEqual(event2);
  });

  it("should throw if a cursor doesn't exist", async () => {
    expect(
      async () =>
        await getNextMusicEvent({
          salt,
          cursor: "a cursor that doesnt exist",
        }),
    ).toThrow();
  });

  it("should throw if overfetching at last cursor", async () => {
    const fetchedEvents: Awaited<ReturnType<typeof getNextMusicEvent>>[] = [];
    while (true) {
      const event = await getNextMusicEvent({
        salt,
        cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
      });
      fetchedEvents.push(event);

      if (fetchedEvents.length === totalEvents) {
        break;
      }
    }

    expect(
      async () =>
        await getNextMusicEvent({
          salt,
          cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
        }),
    ).toThrow();
  });
});

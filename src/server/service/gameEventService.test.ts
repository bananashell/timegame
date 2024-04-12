import { getNextGameEvent } from "./gameEventService";
import { historicEvents } from "@/data/historicEvents/historicEvents";
import { musicEvents } from "@/data/music/musicEvents";
import { describe, it, expect } from "bun:test";

describe("getNextGameEvent", () => {
  describe("music events", () => {
    const salt = "testSalt";
    const totalEvents = musicEvents.length;
    it("should be able to get all events without any duplicates", async () => {
      const fetchedEvents = [];
      while (true) {
        const event = await getNextGameEvent({
          salt,
          cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
          gameType: "music",
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
      const event1 = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "music",
      });
      const event2 = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "music",
      });
      expect(event1).toEqual(event2);
    });

    it("next event should be the same every time", async () => {
      const firstEvent = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "music",
      });
      const event1 = await getNextGameEvent({
        salt,
        cursor: firstEvent.id,
        gameType: "music",
      });
      const event2 = await getNextGameEvent({
        salt,
        cursor: firstEvent.id,
        gameType: "music",
      });
      expect(event1).toEqual(event2);
    });

    it("should throw if a cursor doesn't exist", async () => {
      expect(
        async () =>
          await getNextGameEvent({
            salt,
            cursor: "a cursor that doesnt exist",
            gameType: "music",
          }),
      ).toThrow();
    });

    it("should throw if overfetching at last cursor", async () => {
      const fetchedEvents: Awaited<ReturnType<typeof getNextGameEvent>>[] = [];
      while (true) {
        const event = await getNextGameEvent({
          salt,
          cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
          gameType: "music",
        });
        fetchedEvents.push(event);

        if (fetchedEvents.length === totalEvents) {
          break;
        }
      }

      expect(
        async () =>
          await getNextGameEvent({
            salt,
            cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
            gameType: "music",
          }),
      ).toThrow();
    });
  });
  describe("historic events", () => {
    const salt = "testSalt";
    const totalEvents = historicEvents.length;
    it("should be able to get all events without any duplicates", async () => {
      const fetchedEvents = [];
      while (true) {
        const event = await getNextGameEvent({
          salt,
          cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
          gameType: "history",
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
      const event1 = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "history",
      });
      const event2 = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "history",
      });
      expect(event1).toEqual(event2);
    });

    it("next event should be the same every time", async () => {
      const firstEvent = await getNextGameEvent({
        salt,
        cursor: null,
        gameType: "history",
      });
      const event1 = await getNextGameEvent({
        salt,
        cursor: firstEvent.id,
        gameType: "history",
      });
      const event2 = await getNextGameEvent({
        salt,
        cursor: firstEvent.id,
        gameType: "history",
      });
      expect(event1).toEqual(event2);
    });

    it("should throw if a cursor doesn't exist", async () => {
      expect(
        async () =>
          await getNextGameEvent({
            salt,
            cursor: "a cursor that doesnt exist",
            gameType: "history",
          }),
      ).toThrow();
    });

    it("should throw if overfetching at last cursor", async () => {
      const fetchedEvents: Awaited<ReturnType<typeof getNextGameEvent>>[] = [];
      while (true) {
        const event = await getNextGameEvent({
          salt,
          cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
          gameType: "history",
        });
        fetchedEvents.push(event);

        if (fetchedEvents.length === totalEvents) {
          break;
        }
      }

      expect(
        async () =>
          await getNextGameEvent({
            salt,
            cursor: fetchedEvents[fetchedEvents.length - 1]?.id,
            gameType: "history",
          }),
      ).toThrow();
    });
  });
});

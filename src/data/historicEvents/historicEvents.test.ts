import { historicEvent } from "@/data/historicEvents/historicEvent";
import { describe, expect, it } from "bun:test";
import { historicEvents } from "./historicEvents";
import HistoricEvents from "./historicEvents.json";

const historicEventMap = HistoricEvents.data.map((event) => [
  event.title.en,
  event,
]);

describe("historicEvents", () => {
  describe("parses data correctly", () => {
    it.each(historicEventMap)("'%s'", (_, eventData) => {
      const parseResult = historicEvent.safeParse(eventData);
      expect((parseResult as any)["error"]).toBeFalsy();
      expect(parseResult.success).toBeTrue();
    });
  });

  it("contains unique ids", () => {
    HistoricEvents.data.forEach((event) => {
      expect(historicEvent.parse(event).id).toEqual(event.id);
    });
    const ids = new Set(historicEvents.map((event) => event.id));
    expect(ids.size).toEqual(historicEvents.length);
  });
});

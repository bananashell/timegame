import { describe, it, expect } from "bun:test";
import { historicEvent } from "@/models/historicEvent";
import HistoricEvents from "./historicEvents.json";
import { historicEvents } from "./historicEvents";

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

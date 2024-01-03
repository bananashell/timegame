import { describe, it, expect } from "bun:test";
import { historicEvents } from "./historicEvents";

describe("historicEvents", () => {
  it("contains unique ids", () => {
    const ids = new Set(historicEvents.map((event) => event.id));
    expect(ids.size).toEqual(historicEvents.length);
  });
});

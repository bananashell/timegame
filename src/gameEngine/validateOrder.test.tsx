import { describe, expect, it } from "bun:test";
import { validateOrder } from "./validateOrder";

describe("validateOrder", () => {
  it("returns true when empty array", () => {
    const actual = validateOrder([]);
    expect(actual).toBeTrue();
  });

  it("returns true when empty array", () => {
    const actual = validateOrder([
      { id: "", category: "historicEvent", year: 1910, description: "" },
    ]);
    expect(actual).toBeTrue();
  });

  it("returns true when two events with the same year", () => {
    const actual = validateOrder([
      { id: "", category: "historicEvent", year: 1910, description: "" },
      { id: "", category: "historicEvent", year: 1910, description: "" },
    ]);

    expect(actual).toBeTrue();
  });

  it("returns true when two events in order", () => {
    const actual = validateOrder([
      { id: "", category: "historicEvent", year: 1910, description: "" },
      { id: "", category: "historicEvent", year: 1911, description: "" },
    ]);

    expect(actual).toBeTrue();
  });

  it("returns false when two events not in order", () => {
    const actual = validateOrder([
      { id: "", category: "historicEvent", year: 1911, description: "" },
      { id: "", category: "historicEvent", year: 1910, description: "" },
    ]);

    expect(actual).toBeFalse();
  });
});

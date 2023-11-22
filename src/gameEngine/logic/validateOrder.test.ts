import { describe, expect, it } from "bun:test";
import { validateOrder } from "./validateOrder";
import { GameState, LockedHistoricGameEvent } from "@/gameEngine/gameState";

const createMockGameState = (
  timelineEvents: LockedHistoricGameEvent[],
): GameState => {
  return {
    state: "playing",
    timelineEvents,
    currentEvent: undefined,
  };
};

describe("validateOrder", () => {
  it("returns true when empty array", () => {
    const actual = validateOrder(createMockGameState([]));
    expect(actual).toBeTrue();
  });

  it("returns true when empty array", () => {
    const actual = validateOrder(
      createMockGameState([
        {
          id: "",
          category: "culture",
          year: 1910,
          description: "",
          guess: 0,
          score: 0,
        },
      ]),
    );
    expect(actual).toBeTrue();
  });

  it("returns true when two events with the same year", () => {
    const actual = validateOrder(
      createMockGameState([
        {
          id: "",
          category: "culture",
          year: 1910,
          description: "",
          guess: 0,
          score: 0,
        },
        {
          id: "",
          category: "culture",
          year: 1910,
          description: "",
          guess: 0,
          score: 0,
        },
      ]),
    );

    expect(actual).toBeTrue();
  });

  it("returns true when two events in order", () => {
    const actual = validateOrder(
      createMockGameState([
        {
          id: "",
          category: "culture",
          year: 1910,
          description: "",
          guess: 0,
          score: 0,
        },
        {
          id: "",
          category: "culture",
          year: 1911,
          description: "",
          guess: 0,
          score: 0,
        },
      ]),
    );

    expect(actual).toBeTrue();
  });

  it("returns false when two events not in order", () => {
    const actual = validateOrder(
      createMockGameState([
        {
          id: "",
          category: "culture",
          year: 1911,
          description: "",
          guess: 0,
          score: 0,
        },
        {
          id: "",
          category: "culture",
          year: 1910,
          description: "",
          guess: 0,
          score: 0,
        },
      ]),
    );

    expect(actual).toBeFalse();
  });
});

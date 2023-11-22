import { describe, it, expect } from "bun:test";
import {
  FIVE_POINT_DIFF_CUTOFF,
  SCORES,
  calculateScore,
} from "./calculateScore";
import { GameState } from "@/gameEngine/gameState";

type MockCurrentEvent = GameState["currentEvent"];
type MockTimelineEvent = GameState["timelineEvents"][number];

describe("calculateScore", () => {
  it("throws when guess is missing", () => {
    const actual = () => calculateScore({} as any);
    expect(actual).toThrow();
  });

  it("return false when guess is before lower bounds", () => {
    const actual = calculateScore({
      timelineEvents: [
        {
          year: 1890,
        } as MockTimelineEvent,
      ],
      state: "playing",
      currentEvent: {
        guess: 1889,
        year: 1900,
      } as MockCurrentEvent,
    });
    expect(actual).toBeFalse();
  });

  it("return false when guess is after upper bounds", () => {
    const actual = calculateScore({
      timelineEvents: [
        {
          year: 1900,
        } as MockTimelineEvent,
      ],
      state: "playing",
      currentEvent: {
        guess: 1901,
        year: 1890,
      } as MockCurrentEvent,
    });
    expect(actual).toBeFalse();
  });

  it("returns 10 when guess is correct", () => {
    const actual = calculateScore({
      currentEvent: {
        guess: 1900,
        year: 1900,
      },
    } as GameState);
    expect(actual).toBe(SCORES.MAXIMUM_SCORE);
  });

  it.each(createDiffArray(-10, 10, 0))(
    `returns ${SCORES.SMALL_DIFF_SCORE} when diff is %i`,
    (diff: number) => {
      const correctYear = 1900;
      const actual = calculateScore({
        timelineEvents: [
          {
            year: 1890,
          } as MockTimelineEvent,
          {
            year: 2000,
          } as MockTimelineEvent,
        ],
        state: "playing",
        currentEvent: {
          guess: correctYear + diff,
          year: correctYear,
        } as MockCurrentEvent,
      });
      expect(actual).toBe(SCORES.SMALL_DIFF_SCORE);
    },
  );

  it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than +${FIVE_POINT_DIFF_CUTOFF}`, () => {
    const actual = calculateScore({
      timelineEvents: [
        {
          year: 1890,
        } as MockTimelineEvent,
      ],
      state: "playing",
      currentEvent: {
        guess: 1911,
        year: 1900,
      } as MockCurrentEvent,
    });
    expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  });

  it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than -${FIVE_POINT_DIFF_CUTOFF}`, () => {
    const actual = calculateScore({
      timelineEvents: [
        {
          year: 1800,
        } as MockTimelineEvent,
      ],
      state: "playing",
      currentEvent: {
        guess: 1889,
        year: 1900,
      } as MockCurrentEvent,
    });
    expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  });
});

function createDiffArray(
  startDiff: number,
  endDiff: number,
  exclude: number,
): number[] {
  const diffArray: number[] = [];

  for (let year = startDiff; year <= endDiff; year++) {
    if (year !== exclude) {
      diffArray.push(year);
    }
  }

  return diffArray;
}

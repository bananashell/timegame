import { describe, it, expect } from "bun:test";
import {
  FIVE_POINT_DIFF_CUTOFF,
  SCORES,
  calculateScore,
} from "./calculateScore";
import { LockedHistoricGameEvent, RootState } from "@/gameEngine/gameState";
import { HistoricEvent } from "@/models/historicEvent";

describe("calculateScore", () => {
  it("throws when guess is missing", () => {
    const actual = () => calculateScore({} as any);
    expect(actual).toThrow();
  });

  it("return false when guess is before lower bounds", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1890,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1889,
      currentEvent: {
        year: 1900,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBeFalse();
  });

  it("return false when guess is after upper bounds", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1900,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1901,
      currentEvent: {
        year: 1890,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBeFalse();
  });

  it("returns 10 when guess is correct", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1900,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1900,
      currentEvent: {
        year: 1900,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.MAXIMUM_SCORE);
  });

  it.each(createDiffArray(-10, 10, 0))(
    `returns ${SCORES.SMALL_DIFF_SCORE} when diff is %i`,
    (diff: number) => {
      const correctYear = 1900;
      const actual = calculateScore({
        historicEvents: [
          {
            year: 1890,
          },
          {
            year: 2000,
          },
        ] as unknown as LockedHistoricGameEvent[],
        guess: correctYear + diff,
        currentEvent: {
          year: correctYear,
        } as unknown as HistoricEvent,
      });
      expect(actual).toBe(SCORES.SMALL_DIFF_SCORE);
    },
  );

  it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than +${FIVE_POINT_DIFF_CUTOFF}`, () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1890,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1911,
      currentEvent: {
        year: 1900,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  });

  it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than -${FIVE_POINT_DIFF_CUTOFF}`, () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1800,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1889,
      currentEvent: {
        year: 1900,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  });

  it("returns points when answer and guess is before all other timeline events", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1945,
        },
        {
          year: 1992,
        },
        {
          year: 1995,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1900,
      currentEvent: {
        year: 1918,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  });

  it("returns points when guess is before all other timeline events and event has the same year as another event", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1969,
        },
        {
          year: 1995,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1968,
      currentEvent: {
        year: 1969,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.SMALL_DIFF_SCORE);
  });

  it("returns points when guess is after all other timeline events and event has the same year as another event", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1969,
        },
        {
          year: 1995,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 1996,
      currentEvent: {
        year: 1995,
      } as unknown as HistoricEvent,
    });
    expect(actual).toBe(SCORES.SMALL_DIFF_SCORE);
  });

  it("returns points when answer and guess is after all other timeline events", () => {
    const actual = calculateScore({
      historicEvents: [
        {
          year: 1945,
        },
        {
          year: 1992,
        },
        {
          year: 1995,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 2000,
      currentEvent: {
        year: 2020,
      } as unknown as HistoricEvent,
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

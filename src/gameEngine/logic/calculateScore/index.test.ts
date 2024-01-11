import { describe, it, expect } from "bun:test";
import { calculateScore } from ".";
import { LockedHistoricGameEvent } from "@/gameEngine/gameState";
import { HistoricEvent } from "@/models/historicEvent";
import { GameEntity } from "@/data/db/game/gameEntity";

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

  it("returns 20 when guess is correct", () => {
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
    expect(actual).toBe(20);
  });

  it.each(createDiffArray(-10, 10, 0))(
    `calculates correctly when diff is %i`,
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
      expect(actual).toBe(Math.max(10 - Math.abs(diff), 1));
    },
  );

  // it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than +${FIVE_POINT_DIFF_CUTOFF}`, () => {
  //   const actual = calculateScore({
  //     historicEvents: [
  //       {
  //         year: 1890,
  //       },
  //     ] as unknown as LockedHistoricGameEvent[],
  //     guess: 1911,
  //     currentEvent: {
  //       year: 1900,
  //     } as unknown as HistoricEvent,
  //   });
  //   expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  // });

  // it(`returns ${SCORES.LARGE_DIFF_SCORE} when diff is more than -${FIVE_POINT_DIFF_CUTOFF}`, () => {
  //   const actual = calculateScore({
  //     historicEvents: [
  //       {
  //         year: 1800,
  //       },
  //     ] as unknown as LockedHistoricGameEvent[],
  //     guess: 1889,
  //     currentEvent: {
  //       year: 1900,
  //     } as unknown as HistoricEvent,
  //   });
  //   expect(actual).toBe(SCORES.LARGE_DIFF_SCORE);
  // });

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
    expect(actual).toBe(1);
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
    expect(actual).toBe(9);
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
    expect(actual).toBe(9);
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
    expect(actual).toBe(1);
  });

  it("doesn't alter the array order", () => {
    const data = {
      historicEvents: [
        {
          year: 1992,
        },
        {
          year: 1945,
        },
        {
          year: 1995,
        },
      ] as unknown as LockedHistoricGameEvent[],
      guess: 2000,
      currentEvent: {
        year: 2020,
      } as unknown as HistoricEvent,
    };
    const actual = calculateScore(data);

    expect(data.historicEvents.at(0)!.year).toEqual(1992);
    expect(data.historicEvents.at(1)!.year).toEqual(1945);
    expect(data.historicEvents.at(2)!.year).toEqual(1995);
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

describe("real data", () => {
  it("ends when a wrong guess is made", () => {
    const previousEvents: LockedHistoricGameEvent[] = [];
    let totalScore = 0;

    for (const event of entity.events) {
      const actual = calculateScore({
        historicEvents: previousEvents,
        guess: event.guess,
        currentEvent: event,
      });

      totalScore += actual || 0;
      previousEvents.push({ ...event });

      if (event.id === "3591d947-781c-4f20-9d1e-f654b8d3ae20") {
        expect(actual).toBeFalse();
      }
    }
  });
});

const mockText = { sv: "", en: "" };
const entity: GameEntity = {
  id: "",
  salt: "2285cbedd67997e0",
  userId: "3e4874bb-0c0b-4017-9961-6b04aebb3264",
  username: "jocke",
  createdAt: new Date(),
  totalScore: 128,
  lastUpdated: new Date(),
  gameStatus: "game over",
  noEvents: 22,
  events: [
    {
      score: 1,
      year: 1969,
      guess: 1976,
      description: mockText,
      id: "7f3eee96-9c23-4aa1-8fb9-e1d81dd7af78",
      title: mockText,
      category: "culture",
    },
    {
      score: 10,
      year: 1945,
      guess: 1945,
      description: mockText,
      id: "5827119b-85c5-4f3a-bbf2-fd6134080f0e",
      title: mockText,
      category: "war",
    },
    {
      score: 10,
      year: 1901,
      guess: 1901,
      description: mockText,
      id: "78a9d962-e15b-4fc1-92ae-314691a4c6fe",
      title: mockText,
      category: "culture",
    },
    {
      score: 1,
      year: 1735,
      guess: 1710,
      description: mockText,
      id: "420a93b5-38e2-4a18-99ad-ee5713feb5d6",
      title: mockText,
      category: "science",
    },
    {
      score: 5,
      year: 1605,
      guess: 1600,
      description: mockText,
      id: "a1c1dc8e-15ba-45e6-83d3-aa2e5407423a",
      title: mockText,
      category: "culture",
    },
    {
      score: 10,
      year: 1918,
      guess: 1918,
      description: mockText,
      id: "12f30caa-2c6a-4690-9759-a8d6598165ad",
      title: mockText,
      category: "war",
    },
    {
      score: 1,
      year: 1492,
      guess: 1523,
      description: mockText,
      id: "d0a0f4b9-f050-4b97-8ed9-20dc81544cce",
      title: mockText,
      category: "exploration",
    },
    {
      score: 10,
      year: 1638,
      guess: 1638,
      description: mockText,
      id: "45d14b37-6837-4ae5-90ad-51c6d37f7a5b",
      title: mockText,
      category: "exploration",
    },
    {
      score: 1,
      year: 1876,
      guess: 1810,
      description: mockText,
      id: "a6002c28-f379-4662-947e-4fc2d3e36858",
      title: mockText,
      category: "technology",
    },
    {
      score: 10,
      year: 1969,
      guess: 1969,
      description: mockText,
      id: "38d2c0c4-4e1c-4f71-b263-c36b7d5f0b05",
      title: mockText,
      category: "technology",
    },
    {
      score: 10,
      year: 1995,
      guess: 1995,
      description: mockText,
      id: "d4e274ee-ee3c-4ee8-87ca-a4ccd9fafa75",
      title: mockText,
      category: "history",
    },
    {
      score: 10,
      year: 1523,
      guess: 1523,
      description: mockText,
      id: "cc8fe089-0d12-4a47-aeef-5fe2f56c10a0",
      title: mockText,
      category: "history",
    },
    {
      score: 10,
      year: 2003,
      guess: 2003,
      description: mockText,
      id: "3af64621-99ea-425c-b02f-ec367b78db20",
      title: mockText,
      category: "technology",
    },
    {
      score: 1,
      year: 1809,
      guess: 1890,
      description: mockText,
      id: "3591d947-781c-4f20-9d1e-f654b8d3ae20",
      title: mockText,
      category: "politics",
    },
    {
      score: 5,
      year: 1971,
      guess: 1976,
      description: mockText,
      id: "81aa8317-4fac-417d-80b6-ebfd047026c7",
      title: mockText,
      category: "politics",
    },
    {
      score: 10,
      year: 1989,
      guess: 1989,
      description: mockText,
      id: "d8cec920-cf93-49a5-a808-ef1a2ab68989",
      title: mockText,
      category: "technology",
    },
    {
      score: 1,
      year: 1519,
      guess: 1506,
      description: mockText,
      id: "08038ee4-d27a-4d13-8ea0-d8a1cc7136f5",
      title: mockText,
      category: "exploration",
    },
    {
      score: 1,
      year: 1687,
      guess: 1650,
      description: mockText,
      id: "7b920779-834e-4199-8d22-9c617ed0811b",
      title: mockText,
      category: "science",
    },
    {
      score: 1,
      year: 1789,
      guess: 1887,
      description: mockText,
      id: "6142f822-83f3-4cf7-9fea-1a96c7e36925",
      title: mockText,
      category: "politics",
    },
    {
      score: 10,
      year: 2016,
      guess: 2016,
      description: mockText,
      id: "a42c1483-8007-4096-873d-0ce6ef08920a",
      title: mockText,
      category: "culture",
    },
    {
      score: 10,
      year: 1776,
      guess: 1776,
      description: mockText,
      id: "eaf4287a-da99-4030-a322-8169b15d86d2",
      title: mockText,
      category: "politics",
    },
    {
      score: 0,
      year: 1876,
      guess: 1750,
      description: mockText,
      id: "872eb354-8ebe-4686-a2bb-4519c225aedb",
      title: mockText,
      category: "technology",
    },
  ],
};

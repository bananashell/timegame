import { describe, it, expect } from "bun:test";
import { isInTimespan } from "./isInTimespan";
import { GameEntity } from "@/data/db/game/gameEntity";
const mockText = { sv: "", en: "" };
describe("isInTimespan", () => {
  it("should return true if the given date is within the timespan", () => {
    const entity: GameEntity = {
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
      ],
    };

    const result = isInTimespan({
      guess: 1890,
      currentEvent: {
        year: 1809,
      },
      historicEvents: entity.events.map((event) => ({
        year: event.year,
        score: event.score,
      })),
    });

    expect(result).toBe(false);
  });
});

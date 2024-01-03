import { describe, it, expect } from "bun:test";
import { isInTimespan } from "./isInTimespan";
import { GameEntity } from "@/data/db/game/gameEntity";

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
          description:
            "The Woodstock Festival, a pivotal moment in music history, takes place in upstate New York.",
          id: "7f3eee96-9c23-4aa1-8fb9-e1d81dd7af78",
          title: "Woodstock Festival",
          category: "culture",
        },
        {
          score: 10,
          year: 1945,
          guess: 1945,
          description:
            "World War II ends in Europe with the unconditional surrender of Nazi Germany.",
          id: "5827119b-85c5-4f3a-bbf2-fd6134080f0e",
          title: "End of World War II in Europe",
          category: "war",
        },
        {
          score: 10,
          year: 1901,
          guess: 1901,
          description:
            "Selma Lagerlöf becomes the first female writer to win the Nobel Prize in Literature for her work 'Gösta Berling's Saga.'",
          id: "78a9d962-e15b-4fc1-92ae-314691a4c6fe",
          title: "Selma Lagerlöf Wins Nobel Prize in Literature",
          category: "culture",
        },
        {
          score: 1,
          year: 1735,
          guess: 1710,
          description:
            "Carl Linnaeus publishes 'Systema Naturae,' establishing the system of binomial nomenclature for species classification.",
          id: "420a93b5-38e2-4a18-99ad-ee5713feb5d6",
          title: "Publication of 'Systema Naturae'",
          category: "science",
        },
        {
          score: 5,
          year: 1605,
          guess: 1600,
          description:
            "William Shakespeare's play 'Macbeth' is performed for the first time in London.",
          id: "a1c1dc8e-15ba-45e6-83d3-aa2e5407423a",
          title: "First Performance of Macbeth",
          category: "culture",
        },
        {
          score: 10,
          year: 1918,
          guess: 1918,
          description:
            "World War I ends with the signing of the Armistice of 11 November, leading to peace negotiations.",
          id: "12f30caa-2c6a-4690-9759-a8d6598165ad",
          title: "End of World War I",
          category: "war",
        },
        {
          score: 1,
          year: 1492,
          guess: 1523,
          description:
            "Christopher Columbus sets sail from Spain on his first voyage across the Atlantic, reaching the Americas.",
          id: "d0a0f4b9-f050-4b97-8ed9-20dc81544cce",
          title: "Christopher Columbus' Voyage",
          category: "exploration",
        },
        {
          score: 10,
          year: 1638,
          guess: 1638,
          description:
            "Foundation of Gothenburg, a significant Swedish port city, aimed at expanding trade and maritime activities.",
          id: "45d14b37-6837-4ae5-90ad-51c6d37f7a5b",
          title: "Foundation of Gothenburg",
          category: "exploration",
        },
        {
          score: 1,
          year: 1876,
          guess: 1810,
          description:
            "Alfred Nobel invents dynamite, revolutionizing the field of explosives and laying the foundation for the Nobel Prizes.",
          id: "a6002c28-f379-4662-947e-4fc2d3e36858",
          title: "Invention of Dynamite",
          category: "technology",
        },
        {
          score: 10,
          year: 1969,
          guess: 1969,
          description:
            "Apollo 11 successfully lands the first humans, Neil Armstrong and Buzz Aldrin, on the Moon.",
          id: "38d2c0c4-4e1c-4f71-b263-c36b7d5f0b05",
          title: "Apollo 11 Moon Landing",
          category: "technology",
        },
        {
          score: 10,
          year: 1995,
          guess: 1995,
          description:
            "Sweden joins the European Union (EU) after a referendum in which the majority of voters supported membership.",
          id: "d4e274ee-ee3c-4ee8-87ca-a4ccd9fafa75",
          title: "Sweden Joins the European Union",
          category: "history",
        },
        {
          score: 10,
          year: 1523,
          guess: 1523,
          description:
            "Gustav Vasa is elected King of Sweden, marking the end of the Kalmar Union and the beginning of modern Sweden.",
          id: "cc8fe089-0d12-4a47-aeef-5fe2f56c10a0",
          title: "Gustav Vasa Elected King of Sweden",
          category: "history",
        },
        {
          score: 10,
          year: 2003,
          guess: 2003,
          description:
            "Skype, a communication platform founded by Niklas Zennström and Janus Friis, which plays a significant role in global communications, is developed in Sweden.",
          id: "3af64621-99ea-425c-b02f-ec367b78db20",
          title: "Skype is released",
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

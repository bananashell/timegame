import { describe, it, expect } from "bun:test";
import { FIVE_POINT_DIFF_CUTOFF, SCORES, calculateScore } from ".";
import { LockedHistoricGameEvent, RootState } from "@/gameEngine/gameState";
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
    {
      score: 1,
      year: 1809,
      guess: 1890,
      description:
        "The Finnish War concludes with the signing of the Treaty of Fredrikshamn, resulting in the loss of Finland to Russia.",
      id: "3591d947-781c-4f20-9d1e-f654b8d3ae20",
      title: "Treaty of Fredrikshamn",
      category: "politics",
    },
    {
      score: 5,
      year: 1971,
      guess: 1976,
      description:
        "Sweden officially switches from driving on the left-hand side of the road to the right-hand side, known as Dagen H (H Day).",
      id: "81aa8317-4fac-417d-80b6-ebfd047026c7",
      title: "Switch to Right-Hand Traffic in Sweden",
      category: "politics",
    },
    {
      score: 10,
      year: 1989,
      guess: 1989,
      description:
        "Tim Berners-Lee, a British computer scientist, proposes the concept of the World Wide Web, laying the groundwork for its development, which later becomes integral worldwide.",
      id: "d8cec920-cf93-49a5-a808-ef1a2ab68989",
      title: "Invention of the World Wide Web",
      category: "technology",
    },
    {
      score: 1,
      year: 1519,
      guess: 1506,
      description:
        "Ferdinand Magellan's expedition sets off to circumnavigate the globe, ultimately proving the Earth is round.",
      id: "08038ee4-d27a-4d13-8ea0-d8a1cc7136f5",
      title: "Magellan travels around the globe",
      category: "exploration",
    },
    {
      score: 1,
      year: 1687,
      guess: 1650,
      description:
        "Isaac Newton publishes 'Philosophiæ Naturalis Principia Mathematica,' introducing the laws of motion and universal gravitation.",
      id: "7b920779-834e-4199-8d22-9c617ed0811b",
      title: "Publication of Newton's Principia",
      category: "science",
    },
    {
      score: 1,
      year: 1789,
      guess: 1887,
      description:
        "The French Revolution begins with the storming of the Bastille, marking the end of the absolute monarchy in France.",
      id: "6142f822-83f3-4cf7-9fea-1a96c7e36925",
      title: "Start of the French Revolution",
      category: "politics",
    },
    {
      score: 10,
      year: 2016,
      guess: 2016,
      description:
        "Bob Dylan, an American musician and songwriter, wins the Nobel Prize in Literature, becoming the first musician to receive this prestigious award.",
      id: "a42c1483-8007-4096-873d-0ce6ef08920a",
      title: "Bob Dylan Wins Nobel Prize in Literature",
      category: "culture",
    },
    {
      score: 10,
      year: 1776,
      guess: 1776,
      description:
        "The United States Declaration of Independence is adopted, marking the birth of the United States of America.",
      id: "eaf4287a-da99-4030-a322-8169b15d86d2",
      title: "United States Declaration of Independence",
      category: "politics",
    },
    {
      score: 0,
      year: 1876,
      guess: 1750,
      description:
        "Alexander Graham Bell patents the telephone, revolutionizing communication.",
      id: "872eb354-8ebe-4686-a2bb-4519c225aedb",
      title: "Invention of the Telephone",
      category: "technology",
    },
  ],
};
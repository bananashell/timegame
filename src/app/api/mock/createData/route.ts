import { GameEntity, gameEntity } from "@/data/db/game/gameEntity";
import { gamesCollection } from "@/data/db/game/repository/gamesCollection";
import { GameId } from "@/data/db/game/gameId";
import { generateYearAndWeek } from "@/utils/date/generateYearAndWeek";
import { v4 as uuidv4 } from "uuid";
import { notFound } from "next/navigation";

export const POST = async () => {
  if (process.env.NODE_ENV !== "development") {
    return notFound();
  }

  if (process.env.FIRESTORE_EMULATOR_HOST != "127.0.0.1:8080") {
    throw new Error("This route should only be used in the emulator");
  }

  const collection = await gamesCollection();

  entities.forEach(async (entity) => {
    console.log("Adding game entity to firebase");
    await collection.doc(entity.id.toString()).create(entity);
    console.log("Created game with id: ", entity.id.toString());
  });

  return Response.json({ message: "ok" });
};

const seed = ["testseed1", "testseed2", "testseed3", "testseed4"];
const userId = "00000000-0000-0000-0000-000000000000";
const now = new Date();
const entities = [
  gameEntity.parse({
    id: new GameId({ salt: seed[0], userId: userId }).toString(),
    gameType: "all",
    events: [
      {
        id: uuidv4(),
        type: "historic",
        title: {
          sv: "Fråga 1",
          en: "Questio  1",
        },
        category: "discovery",
        year: 1980,
        guess: 1981,
        score: 10,
        description: {
          sv: "",
          en: "",
        },
      },
      {
        id: uuidv4(),
        type: "historic",
        title: {
          sv: "Fråga 2",
          en: "Questio  2",
        },
        category: "discovery",
        year: 1980,
        guess: 1980,
        score: 20,
        description: {
          sv: "",
          en: "",
        },
      },
    ],
    gameStatus: "game over",
    noEvents: 2,
    salt: seed[0],
    totalScore: 30,
    userId: userId,
    username: "testuser",
    createdAt: now,
    lastUpdated: now,
    weekAndYear: generateYearAndWeek(now).key,
  } satisfies GameEntity),

  gameEntity.parse({
    id: new GameId({ salt: seed[1], userId: userId }).toString(),
    gameType: "all",
    events: [
      {
        id: uuidv4(),
        type: "historic",
        title: {
          sv: "Fråga 1",
          en: "Questio  1",
        },
        category: "discovery",
        year: 1980,
        guess: 1981,
        score: 10,
        description: {
          sv: "",
          en: "",
        },
      },
      {
        id: uuidv4(),
        type: "historic",
        title: {
          sv: "Fråga 2",
          en: "Questio  2",
        },
        category: "discovery",
        year: 1980,
        guess: 1980,
        score: 20,
        description: {
          sv: "",
          en: "",
        },
      },
    ],
    gameStatus: "game over",
    noEvents: 2,
    salt: seed[0],
    totalScore: 30,
    userId: userId,
    username: "testuser",
    createdAt: now,
    lastUpdated: now,
    weekAndYear: generateYearAndWeek(now).key,
  } satisfies GameEntity),
];

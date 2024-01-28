process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

import { GameEntity, gameEntity } from "../src/data/db/game/gameEntity";
import { gamesCollection } from "../src/data/db/game/repository/gamesCollection";
import { GameId } from "../src/data/db/game/gameId";
import { generateYearAndWeek } from "../src/utils/date/generateYearAndWeek";
import { v4 as uuidv4 } from "uuid";

const seed = ["testseed1", "testseed2", "testseed3", "testseed4"];
const userId = "00000000-0000-0000-0000-000000000000";

const id = new GameId({ salt: seed[0], userId: userId });
console.log("Getting collection");
const collection = await gamesCollection();
const now = new Date();
console.log("Creating game entity");
const entity = gameEntity.parse({
  id: id.toString(),
  events: [
    {
      id: uuidv4(),
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
} satisfies GameEntity);

console.log("Adding game entity to firebase");
await collection.doc(id.toString()).create(entity);
console.log("Created game with id: ", id.toString());

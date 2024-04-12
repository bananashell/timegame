import { z } from "zod";
import { GameEntity, gameEntity } from "../gameEntity";
import { gamesCollection } from "./gamesCollection";
import { GameId } from "../gameId";
import { generateYearAndWeek } from "@/utils/date/generateYearAndWeek";
import { gameTypes } from "@/gameEngine/gameState";

const createNewGameEntityInput = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  username: z.string().min(1).max(255),
  gameType: gameTypes,
});
export const createNewGameEntity = async (
  input: z.infer<typeof createNewGameEntityInput>,
): Promise<GameEntity> => {
  const { userId, salt, username, gameType } =
    createNewGameEntityInput.parse(input);

  const id = new GameId({ salt: salt, userId: userId, gameType: gameType });
  console.log("id", id.toString());
  const collection = await gamesCollection();
  const now = new Date();
  const entity = gameEntity.parse({
    id: id.toString(),
    gameType: gameType,
    events: [],
    gameStatus: "playing",
    noEvents: 0,
    salt: salt,
    totalScore: 0,
    userId: userId,
    username: username,
    createdAt: now,
    lastUpdated: now,
    weekAndYear: generateYearAndWeek(now).key,
  } satisfies GameEntity);

  const existing = await collection.doc(id.toString()).get();
  if (existing.exists) {
    return existing.data() as GameEntity;
  }

  await collection.doc(id.toString()).create(entity);
  return entity;
};

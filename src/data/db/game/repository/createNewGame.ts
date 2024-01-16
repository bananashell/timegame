import { z } from "zod";
import { GameEntity } from "../gameEntity";
import { gamesCollection } from "./gamesCollection";
import { gameId } from "../gameId";
import { getISOWeek, getISOWeekYear } from "date-fns";
import { generateYearAndWeek } from "@/utils/date/generateYearAndWeek";

const createNewGameEntityInput = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  username: z.string().min(1).max(255),
});
export const createNewGameEntity = async (
  input: z.infer<typeof createNewGameEntityInput>,
): Promise<GameEntity> => {
  const { userId, salt, username } = createNewGameEntityInput.parse(input);

  const id = gameId({ salt: salt, userId: userId });
  const collection = await gamesCollection();
  const now = new Date();
  const gameEntity: GameEntity = {
    id: id,
    events: [],
    gameStatus: "playing",
    noEvents: 0,
    salt: salt,
    totalScore: 0,
    userId: userId,
    username: username,
    createdAt: now,
    lastUpdated: now,
    weekAndYear: generateYearAndWeek(now),
  };

  const existing = await collection.doc(id).get();
  if (existing.exists) {
    return existing.data() as GameEntity;
  }

  await collection.doc(id).create(gameEntity);
  return gameEntity;
};

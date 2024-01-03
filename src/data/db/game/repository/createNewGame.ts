import { z } from "zod";
import { GameEntity } from "../gameEntity";
import { gamesCollection } from "./gamesCollection";
import { gameId } from "../gameId";

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
  const gameEntity: GameEntity = {
    events: [],
    gameStatus: "playing",
    noEvents: 0,
    salt: salt,
    totalScore: 0,
    userId: userId,
    username: username,
    createdAt: new Date(),
    lastUpdated: new Date(),
  };

  await collection.doc(id).create(gameEntity);
  return gameEntity;
};

import { z } from "zod";
import { GameEntity } from "../gameEntity";
import { gamesCollection } from "./gamesCollection";

export const getHighscoreInput = z.object({
  salt: z.string(),
});

export const getHighscore = async ({ salt }: { salt: string }) => {
  const collection = await gamesCollection();

  const data = await collection
    .where("salt", "==", salt)
    .orderBy("totalScore", "desc")
    .limit(10)
    .get();

  return data.docs.map((doc) => doc.data() as GameEntity);
};

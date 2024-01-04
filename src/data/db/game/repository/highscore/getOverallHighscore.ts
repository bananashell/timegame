import { GameEntity } from "@/data/db/game/gameEntity";
import { gamesCollection } from "@/data/db/game/repository/gamesCollection";

export const getOverallHighscore = async () => {
  const collection = await gamesCollection();

  const data = await collection.orderBy("totalScore", "desc").limit(10).get();

  return data.docs.map((doc) => doc.data() as GameEntity);
};

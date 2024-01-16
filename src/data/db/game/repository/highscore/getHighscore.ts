import { z } from "zod";
import { gamesCollection } from "@/data/db/game/repository/gamesCollection";
import { nameOf } from "@/utils/nameOf";
import { GameEntity } from "../../gameEntity";
import { generateYearAndWeek } from "@/utils/date/generateYearAndWeek";

export const getHighscoreInput = z.object({
  gameId: z.string().optional(),
  date: z.date().optional(),
});

type Highscore = {
  gameId: string;
  username: string;
  score: number;
  noEvents: number;
  position?: number;
};

export const getHighscore = async ({
  gameId,
  date,
}: z.infer<typeof getHighscoreInput>): Promise<Highscore[]> => {
  const collection = await gamesCollection();

  const data = await collection
    .where(
      nameOf<GameEntity>("weekAndYear"),
      "==",
      generateYearAndWeek(date ?? new Date()),
    )
    .orderBy("totalScore", "desc")
    .limit(10)
    .get();

  let highscores: Highscore[] = data.docs.map((doc, index) => {
    const data = doc.data();
    return {
      gameId: doc.id,
      position: index + 1,
      noEvents: data.noEvents,
      score: data.totalScore,
      username: data.username,
    };
  });

  if (!gameId || highscores.find((highscore) => highscore.gameId === gameId)) {
    return highscores;
  }

  const game = (await collection.doc(gameId).get()).data();
  if (!game) {
    return highscores;
  }

  return [
    ...highscores,
    {
      gameId,
      noEvents: game.noEvents,
      score: game.totalScore,
      username: game.username,
    },
  ];
};

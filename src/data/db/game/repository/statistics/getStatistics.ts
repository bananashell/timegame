import { z } from "zod";
import { gamesCollection } from "@/data/db/game/repository/gamesCollection";

export const getStatisticsInput = z.object({
  gameId: z.string(),
});

type Statistics = {
  score: number;
  yearsOff: number;
  averageYearsOff: number;
  noEvents: number;
  noCorrectGuesses: number;
};

export const getStatistics = async ({
  gameId,
}: z.infer<typeof getStatisticsInput>): Promise<{
  gameId: string;
  username: string;
  statistics: Statistics;
}> => {
  const collection = await gamesCollection();

  const game = await collection.doc(gameId).get();
  const data = game.data();

  if (!game.exists || !data) {
    throw new Error("Game does not exist");
  }

  const yearsOff = data.events.reduce((acc, event) => {
    return acc + Math.abs(event.guess - event.year);
  }, 0);

  return {
    gameId,
    username: data.username ?? "",
    statistics: {
      score: data.totalScore,
      yearsOff: yearsOff,
      averageYearsOff: yearsOff / data.noEvents,
      noEvents: data.noEvents,
      noCorrectGuesses: data.events.filter((event) => event.guess == event.year)
        .length,
    },
  };
};

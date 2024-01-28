import { z } from "zod";
import { gamesCollection } from "@/data/db/game/repository/gamesCollection";
import { nameOf } from "@/utils/nameOf";
import { GameEntity } from "@/data/db/game/gameEntity";
import { isDefined } from "@/utils/guards/isDefined";

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
  averages: Awaited<ReturnType<typeof getAverageStatistics>>;
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

  const averages =
    process.env.STATISTIC_AVERAGES === "include"
      ? await getAverageStatistics({
          userId: data.userId,
          gameId: gameId,
        })
      : undefined;

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
    averages,
  };
};

const getAverageStatistics = async ({
  userId,
  gameId,
}: {
  userId: string;
  gameId: string;
}) => {
  const collection = await gamesCollection();

  const allGamesForUserDocs = await collection
    .where(nameOf<GameEntity>("userId"), "==", userId)
    .where(nameOf<GameEntity>("gameStatus"), "==", "game over")
    .where(nameOf<GameEntity>("id"), "!=", gameId)
    .get();

  const allGamesForUser = allGamesForUserDocs.docs
    .map((d) => d.exists && d.data())
    .filter(isDefined);

  if (allGamesForUser.length == 0) return undefined;

  const avgScorePerGame =
    allGamesForUser.reduce((acc, game) => {
      return acc + game.totalScore;
    }, 0) / allGamesForUser.length;

  const avgEventCountPerGame =
    allGamesForUser.reduce((acc, game) => {
      return acc + game.noEvents;
    }, 0) / allGamesForUser.length;

  const avgCorrectGuessesPerGame =
    allGamesForUser.reduce((acc, game) => {
      return (
        acc + game.events.filter((event) => event.guess == event.year).length
      );
    }, 0) / allGamesForUser.length;

  const avgYearsOffPerGame =
    allGamesForUser.reduce((acc, game) => {
      return (
        acc +
        game.events.reduce((eventAcc, event) => {
          return eventAcc + Math.abs(event.guess - event.year);
        }, 0)
      );
    }, 0) / allGamesForUser.length;

  const avgYearsOffPerEvent = avgYearsOffPerGame / avgEventCountPerGame;

  return {
    avgScorePerGame,
    avgYearsOffPerGame,
    avgCorrectGuessesPerGame,
    avgYearsOffPerEvent,
    avgEventCountPerGame,
  };
};

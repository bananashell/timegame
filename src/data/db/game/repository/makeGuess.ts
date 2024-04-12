import { calculateScore } from "@/gameEngine/logic";
import { GameEntity, gameEntity } from "../gameEntity";
import { GameId } from "../gameId";
import { getGame } from "./getGame";
import { z } from "zod";
import { generateYearAndWeek } from "@/utils/date/generateYearAndWeek";
import { Timestamp } from "firebase-admin/firestore";
import { getGameEvent } from "@/data/gameEvents";

export const makeGuessInput = z.object({
  gameId: z.string(),
  guess: z.object({
    questionId: z.string().uuid(),
    guess: z.number().min(0).max(3000),
  }),
});

export type MakeGuessInput = z.infer<typeof makeGuessInput>;

export const makeGuess = async (input: MakeGuessInput): Promise<GameEntity> => {
  const data = makeGuessInput.parse(input);
  const entity = await getGame(GameId.parse(data.gameId));

  if (!entity.exists) {
    throw new Error("Game does not exist");
  }

  const currentEvent = getGameEvent(data.guess.questionId);

  if (!currentEvent)
    throw new Error(`HistoricEvent Id ${data.guess.questionId} does not exist`);
  if (!entity.data) throw new Error("Game does not exist");
  if (entity.data.gameStatus !== "playing")
    throw new Error(`Game is in incorrect state ${entity.data.gameStatus}`);

  const score = calculateScore({
    guess: input.guess.guess,
    historicEvents: entity.data.events,
    currentEvent: currentEvent,
  });

  const updatedData = {
    ...entity.data,
    events: [
      ...entity.data.events,
      {
        ...currentEvent,
        guess: input.guess.guess,
        score: score || 0,
      },
    ],
    noEvents: entity.data.noEvents + 1,
    totalScore: entity.data.totalScore + (score || 0),
    gameStatus: score ? "playing" : "game over",
    lastUpdated: new Date(),
    createdAt:
      entity.data.createdAt instanceof Timestamp
        ? entity.data.createdAt.toDate()
        : new Date(),
    weekAndYear:
      entity.data.weekAndYear ?? generateYearAndWeek(entity.data.createdAt).key,
  } satisfies GameEntity;

  const gameData = gameEntity.safeParse(updatedData);
  if (!gameData.success) {
    console.error("Unable to parse gameData", gameData.error);
    throw new Error(`Invalid game data ${gameData.error}`);
  }
  console.log("Updating game", gameData.data);

  await entity.ref.update(gameData.data);

  return gameData.data;
};

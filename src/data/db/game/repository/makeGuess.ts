import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { getHistoricEvent } from "../../../historicEvents";
import { GameEntity } from "../gameEntity";
import { gameId } from "../gameId";
import { getGame } from "./getGame";
import { z } from "zod";

export const makeGuessInput = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  guess: z.object({
    questionId: z.string().uuid(),
    guess: z.number().min(0).max(3000),
  }),
});

export type MakeGuessInput = z.infer<typeof makeGuessInput>;

export const makeGuess = async (input: MakeGuessInput): Promise<GameEntity> => {
  const data = makeGuessInput.parse(input);
  const entity = await getGame(gameId(data));

  if (!entity.exists) {
    throw new Error("Game does not exist");
  }

  const currentEvent = getHistoricEvent(data.guess.questionId);

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

  const gameData = {
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
  } satisfies GameEntity;

  console.log("Updating game", gameData);

  await entity.ref.update(gameData);

  return gameData;
};

import { historicEvent } from "@/data/historicEvents/historicEvent";
import { musicEvent } from "@/data/music/musicEvent";
import { gameTypes } from "@/gameEngine/gameState";
import { z } from "zod";

const guessAndScore = {
  guess: z.number().min(0).max(3000),
  score: z.number().min(0).max(1000000),
};

export const gameEntity = z.object({
  id: z.string().regex(
    /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}\|[a-z0-9]{8,16}\|(music|history)$/, // uuid|salt|gameType
  ),
  userId: z.string().uuid(),
  salt: z.string(),
  username: z.string().min(1).max(255),
  gameStatus: z.enum(["playing", "game over"]),
  noEvents: z.number().min(0).max(1000000),
  totalScore: z.number().min(0).max(1000000),
  events: z.array(
    historicEvent.extend(guessAndScore).or(musicEvent.extend(guessAndScore)),
  ),
  lastUpdated: z.date(),
  createdAt: z.date(),
  weekAndYear: z.string().regex(/^\d{4}-(?:[1-9]|[1-4][0-9]|5[0-3])$/),
  gameType: gameTypes,
});

export type GameEntity = z.infer<typeof gameEntity>;

import { historicEvent } from "@/models/historicEvent";
import { z } from "zod";

export const gameEntity = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  username: z.string().min(1).max(255),
  gameStatus: z.enum(["playing", "game over"]),
  noEvents: z.number().min(0).max(1000000),
  totalScore: z.number().min(0).max(1000000),
  events: z.array(
    historicEvent.extend({
      guess: z.number().min(0).max(3000),
      score: z.number().min(0).max(1000000),
    }),
  ),
  lastUpdated: z.date(),
  createdAt: z.date(),
});

export type GameEntity = z.infer<typeof gameEntity>;

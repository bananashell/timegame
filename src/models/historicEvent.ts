import { z } from "zod";

export const historicEvent = z.object({
  id: z.string().uuid(),
  category: z.enum([
    "sport",
    "popculture",
    "science",
    "politics",
    "technology",
    "exploration",
    "culture",
    "war",
    "history",
  ]),
  year: z.number(),
  description: z.string(),
});

export type HistoricEvent = z.infer<typeof historicEvent>;
export type Category = HistoricEvent["category"];

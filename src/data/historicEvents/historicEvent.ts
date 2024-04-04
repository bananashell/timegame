import { z } from "zod";

export const historicEvent = z.object({
  id: z.string().uuid(),
  title: z.object({
    sv: z.string(),
    en: z.string(),
  }),
  category: z.enum([
    "sports",
    "popculture",
    "science",
    "politics",
    "technology",
    "exploration",
    "culture",
    "war",
    "history",
    "music",
    "discovery",
  ]),
  year: z.number(),
  description: z.object({
    sv: z.string(),
    en: z.string(),
  }),
});

export type HistoricEvent = z.infer<typeof historicEvent>;
export type Category = HistoricEvent["category"];

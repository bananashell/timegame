import { z } from "zod";

export const musicEvent = z.object({
  id: z.string().uuid(),
  spotifyId: z.string(),
  artistName: z.string().min(1),
  title: z.string().min(1),
  genre: z.enum([
    "rock",
    "pop",
    "hiphop",
    "jazz",
    "classical",
    "electronic",
    "indie",
    "country",
    "reggae",
    "soul",
    "funk",
    "disco",
    "rnb",
  ]),
  preview: z.string().url(),
  coverArt: z.string().url(),
  year: z.number(),
  description: z.object({
    sv: z.string(),
    en: z.string(),
  }),
});

export type MusicEvent = z.infer<typeof musicEvent>;
export type Genre = MusicEvent["genre"];

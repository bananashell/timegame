import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { trpc } from "@/app/_trpc/client";
import { saltAtom } from "../..";

export const asyncHighscoresAtom = loadable(
  atom(async (get) => {
    const salt = get(saltAtom);
    const games = await trpc.getHighscore.query({ salt });

    return games;
  }),
);

asyncHighscoresAtom.debugLabel = "asyncHighscoresAtom";

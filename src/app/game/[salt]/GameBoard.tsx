"use client";

import { CardStack } from "@/app/_components/card";
import { Timeline } from "@/app/_components/timeline";
import { Guess } from "./Guess";
import { stateAtom, rootStateAtom } from "@/app/state";
import { useAtom } from "jotai";
import { CurrentScore } from "@/app/_components/CurrentScore";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Score } from "@/app/_components/Score";
import { useRouter } from "next/navigation";

export const GameBoard = () => {
  const [rootState] = useAtom(rootStateAtom);
  const [state] = useAtom(stateAtom);
  const router = useRouter();

  if (state.mainState === "game over") {
    router.push(`/highscore/${rootState.id}`);
    return null;
  }

  return (
    <main className=" h-screen items-center justify-center w-screen">
      <AnimatePresence>
        {state.mainState === "playing" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="grid gap-x-4
            grid-areas-gameBoard
            lg:grid-areas-lg_gameBoard
            grid-cols-gameBoard
            lg:grid-cols-lg_gameBoard
            grid-rows-gameBoard
            lg:grid-rows-lg_gameBoard
            w-full p-4 h-full"
          >
            <Timeline />
            <CardStack />
            <Guess />
            <CurrentScore />
            <Score />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

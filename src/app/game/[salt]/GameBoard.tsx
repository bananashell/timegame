"use client";

import { CardStack } from "@/app/_components/card/CardStack";
import { Timeline } from "@/app/_components/timeline/Timeline";
import { Guess } from "./Guess";
import { rootStateAtom, stateAtom } from "@/app/state";
import { useAtom } from "jotai";
import { CurrentScore } from "@/app/_components/CurrentScore";
import { GameOver } from "./GameOver";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Score } from "@/app/_components/Score";

export const GameBoard = () => {
  const [state] = useAtom(stateAtom);
  console.log("state", state);
  return (
    <main className=" h-screen items-center justify-center w-screen">
      <AnimatePresence>
        {state.mainState === "game over" && <GameOver />}

        {state.mainState === "playing" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="grid gap-x-4
            grid-areas-gameBoard
            grid-cols-gameBoard
            grid-rows-gameBoard w-full p-4 h-full"
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

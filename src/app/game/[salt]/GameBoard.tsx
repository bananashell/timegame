"use client";

import { CardStack } from "@/app/_components/card/CardStack";
import { Timeline } from "@/app/_components/timeline/Timeline";
import { Guess } from "./Guess";
import { gameStateAtom, stateAtom } from "@/app/state";
import { useAtom } from "jotai";
import { Score } from "@/app/_components/Score";
import { GameOver } from "./GameOver";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const GameBoard = () => {
  const [gameState] = useAtom(gameStateAtom);
  const [state] = useAtom(stateAtom);

  return (
    <main className="flex flex-col h-screen items-center justify-center w-screen">
      <AnimatePresence>
        {state === "game over" && <GameOver />}

        {state !== "game over" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="w-full"
          >
            <CardStack />
            <Guess />
            <Timeline />
            <Score />
            <button
              className="text-black absolute bottom-0 px-4 py-2 bg-white rounded"
              onClick={() => console.log(gameState)}
            >
              debug
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

"use client";

import { CardStack } from "@/app/_components/card/CardStack";
import { Timeline } from "@/app/_components/timeline/Timeline";
import { useGameEngine } from "@/app/_context/gameEngineContext";
import { Guess } from "./Guess";

export const GameBoard = () => {
  const { gameState } = useGameEngine();
  return (
    <main className="flex flex-col h-screen items-center justify-center w-screen">
      <CardStack />
      <Guess />
      <Timeline />
      <button
        className="text-black absolute bottom-0 px-4 py-2 bg-white rounded"
        onClick={() => console.log(gameState)}
      >
        debug
      </button>
    </main>
  );
};

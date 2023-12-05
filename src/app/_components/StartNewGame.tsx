"use client";

import { useStartNewGame } from "../state/actions";

export const StartNewGame = ({ salt }: { salt: string }) => {
  const startNewGame = useStartNewGame();

  const handleStartNewGame = () => {
    console.log("start new game", salt);
    startNewGame({ salt });
  };
  return (
    <button
      className="text-[4vw] hover:scale-125 transition-all"
      onClick={handleStartNewGame}
    >
      Start new game
    </button>
  );
};

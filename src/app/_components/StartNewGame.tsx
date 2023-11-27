"use client";

import { useGameEngine } from "../_context/gameEngineContext";

export const StartNewGame = ({ salt }: { salt: string }) => {
  const { actions } = useGameEngine();

  const handleStartNewGame = () => {
    actions.startNewGame({ salt });
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

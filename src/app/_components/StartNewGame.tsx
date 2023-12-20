"use client";

import { ReactNode } from "react";
import { useStartNewGame } from "../state/actions";

export const StartNewGame = ({
  salt,
  children,
}: {
  salt: string;
  children: ReactNode;
}) => {
  const startNewGame = useStartNewGame();

  const handleStartNewGame = () => {
    startNewGame({ salt });
  };
  return (
    <button
      className="text-[4vw] hover:scale-125 transition-all"
      onClick={handleStartNewGame}
    >
      {children}
    </button>
  );
};

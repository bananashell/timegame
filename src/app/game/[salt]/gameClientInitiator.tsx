"use client";

import { useGameEngine } from "@/app/_context/gameEngineContext";
import { useEffect } from "react";

export const GameClientInitiator = ({ salt }: { salt: string }) => {
  const { actions, gameState } = useGameEngine();
  useEffect(() => {
    if (!salt) return;
    if (gameState.state !== "game start") return;

    actions.startNewGame({ salt });
  }, [gameState, salt]);

  return null;
};

"use client";

import { rootStateAtom, stateAtom } from "@/app/state";
import { useStartNewGame } from "@/app/state/actions";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const GameClientInitiator = () => {
  const { mutateAsync: startNewGame } = useStartNewGame();
  const [state] = useAtom(rootStateAtom);

  useEffect(() => {
    if (state.gameState.mainState !== "game start") return;
    console.log("Recovering game");
    startNewGame();
  }, [state, startNewGame]);

  return null;
};

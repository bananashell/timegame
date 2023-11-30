"use client";

import { stateAtom } from "@/app/state";
import { useStartNewGame } from "@/app/state/actions";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const GameClientInitiator = ({ salt }: { salt: string }) => {
  const startNewGame = useStartNewGame();
  const [state] = useAtom(stateAtom);

  useEffect(() => {
    if (!salt) return;
    if (state !== "game start") return;

    startNewGame({ salt });
  }, [state, salt, startNewGame]);

  return null;
};

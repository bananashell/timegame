"use client";

import { ReactNode } from "react";
import { useStartNewGame } from "../state/actions";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export const StartNewGame = ({
  salt,
  children,
}: {
  salt: string;
  children: ReactNode;
}) => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useStartNewGame();

  const handleStartNewGame = async () => {
    const data = await mutateAsync();
    if (!data) throw new Error("Failed to start new game");

    router.push(`/game/${data.game.salt}`);
  };

  return (
    <button
      className={twMerge(
        "text-[4vw] hover:scale-125 transition-all",
        isLoading && "opacity-50",
      )}
      onClick={handleStartNewGame}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

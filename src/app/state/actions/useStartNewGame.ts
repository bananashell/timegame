import { trpc } from "@/app/_trpc/client";
import { createNewGame } from "@/gameEngine/actions";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gameStateAtom, currentEventAtom } from "..";

export const useStartNewGame = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [_, setCurrentEvent] = useAtom(currentEventAtom);
  const router = useRouter();

  return async (args: { salt: string }) => {
    if (!args.salt) return;

    if (gameState?.state !== "game start" && gameState?.state !== "game over")
      return;

    console.log("starting game", args.salt);
    setGameState(createNewGame(args.salt));

    const res = await trpc.historicEvents.query({
      salt: args.salt,
      pageSize: 1,
      cursor: undefined,
    });

    const next = res[0];
    setCurrentEvent({ ...next, guess: 1900 });

    router.push(`/game/${args.salt}`);
  };
};

import { trpc } from "@/app/_trpc/client";
import { createNewGame } from "@/gameEngine/actions";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { rootStateAtom, currentEventAtom } from "..";

export const useStartNewGame = () => {
  const [rootState, setRootState] = useAtom(rootStateAtom);
  const [_, setCurrentEvent] = useAtom(currentEventAtom);
  const router = useRouter();

  return async (args: { salt: string }) => {
    if (!args.salt) return;

    if (rootState?.gameState.mainState === "playing") return;

    console.log("starting game", args.salt);
    setRootState(createNewGame(args.salt));

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

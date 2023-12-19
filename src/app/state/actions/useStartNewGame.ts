import { trpc } from "@/app/_trpc/client";
import { createNewGame } from "@/gameEngine/actions";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { rootStateAtom, currentEventAtom } from "..";
import { v4 as uuidv4 } from "uuid";

export const useStartNewGame = () => {
  const [rootState, setRootState] = useAtom(rootStateAtom);
  const [_, setCurrentEvent] = useAtom(currentEventAtom);
  const router = useRouter();

  return async (args: { salt: string }) => {
    const userId = global.localStorage.getItem("userId") ?? uuidv4();
    global.localStorage.setItem("userId", userId);

    if (!args.salt) return;

    if (rootState?.gameState.mainState === "playing") return;

    console.log("starting game", args.salt);
    setRootState(createNewGame(args.salt));

    const res = await Promise.all([
      trpc.upsertGame.mutate({
        gameStatus: "playing",
        name: "username",
        noQuestions: 0,
        salt: args.salt,
        score: 0,
        userId,
      }),
      trpc.historicEvents.query({
        salt: args.salt,
        pageSize: 1,
        cursor: undefined,
      }),
    ]);

    const next = res[1][0];
    setCurrentEvent({ ...next, guess: 1900 });

    router.push(`/game/${args.salt}`);
  };
};

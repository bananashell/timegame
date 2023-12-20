import { trpc } from "@/app/_trpc/client";
import { createNewGame } from "@/gameEngine/actions";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { rootStateAtom, currentEventAtom, userIdAtom } from "..";
import { v4 as uuidv4 } from "uuid";

export const useStartNewGame = () => {
  const [rootState, setRootState] = useAtom(rootStateAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [_, setCurrentEvent] = useAtom(currentEventAtom);
  const router = useRouter();

  return async (args: { salt: string }) => {
    const newUserId = userId ?? uuidv4();
    setUserId(newUserId);
    global.localStorage.setItem("userId", newUserId);

    if (!args.salt) return;

    if (rootState?.gameState.mainState === "playing") return;

    console.log("starting game", args.salt);
    setRootState(
      createNewGame({ salt: args.salt, userId, username: rootState.username }),
    );

    const res = await Promise.all([
      trpc.upsertGame.mutate({
        gameStatus: "playing",
        username: rootState.username,
        noQuestions: 0,
        salt: args.salt,
        score: 0,
        userId: newUserId,
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

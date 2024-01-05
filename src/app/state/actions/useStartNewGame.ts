import { trpc } from "@/app/_trpc/client";
import { useAtom } from "jotai";
import { rootStateAtom, currentEventAtom, userIdAtom } from "..";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useCookies } from "next-client-cookies";

export const useStartNewGame = () => {
  const cookies = useCookies();
  const [rootState, setRootState] = useAtom(rootStateAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  ); // TODO: change to expose state from react-query instead

  const { mutateAsync: startNewGameAsync } = trpc.startNewGame.useMutation();

  return {
    mutateAsync: async () => {
      setState("loading");
      try {
        const newUserId = userId ?? uuidv4();
        setUserId(newUserId);
        cookies.set("userId", newUserId);

        if (rootState?.gameState.mainState === "playing") return;

        const res = await startNewGameAsync({
          userId: newUserId,
          username: rootState.username,
        });

        setRootState({
          ...res.game,
          gameState: { mainState: "playing", subState: "guessing" },
          timelineEvents: [],
          currentEvent: { ...res.nextEvent, guess: 1900 },
        });

        setState("success");
        return res;
      } catch (e) {
        console.error(e);
        setState("error");
        return undefined;
      }
    },
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
  };
};

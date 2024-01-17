import { trpc } from "@/app/_trpc/client";
import { useAtom } from "jotai";
import { rootStateAtom, currentEventAtom, userIdAtom } from "..";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { RootState } from "@/gameEngine/gameState";

export const useStartNewGame = () => {
  const [rootState, setRootState] = useAtom(rootStateAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  return {
    mutateAsync: async () => {
      setState("loading");
      try {
        const newUserId = userId ?? uuidv4();
        setUserId(newUserId);
        global.localStorage.setItem("userId", newUserId);

        if (rootState?.gameState.mainState === "playing") return;

        const res = await trpc.startNewGame.mutate({
          userId: newUserId,
          username: rootState.username,
        });

        let state: RootState["gameState"] = {
          mainState: "playing",
          subState: "guessing",
        };
        if (res.game.gameStatus === "game over") {
          state = {
            mainState: "game over",
            subState: "score screen",
          };
        }

        setRootState({
          ...res.game,
          gameState: state,
          timelineEvents: res.game.events,
          currentEvent: { ...res.nextEvent, guess: 0 },
        });

        setState("success");
        return res;
      } catch (e) {
        setState("error");
        return undefined;
      }
    },
    isIdle: state === "idle",
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
  };
};

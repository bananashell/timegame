"use client";

import { HistoricEvent } from "@/models/historicEvent";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export type GameEngineContextProps = {
  gameState: "idle" | "playing" | "game over";
  timeline: HistoricEvent[];
  latestItem?: HistoricEvent;
  actions: {
    startNewGame: (args: { salt?: string }) => void;
  };
};

const GameEngineContext = createContext<GameEngineContextProps>(
  {} as GameEngineContextProps,
);
GameEngineContext.displayName = "GameEngineContext";

export const GameEngineProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const [salt, setSalt] = useState("");
  const [timeline, setTimeline] = useState<HistoricEvent[]>([]);
  const [latestItem, setLatestItem] = useState<HistoricEvent>();
  const [gameState, setGameState] =
    useState<GameEngineContextProps["gameState"]>("idle");

  const { data } = trpc.historicEvents.useInfiniteQuery(
    {
      pageSize: 1,
      salt: salt,
    },
    { enabled: !!salt },
  );

  useEffect(() => {
    setLatestItem(data?.pages.at(-1)?.at(-1));
  }, [data?.pages?.length]);

  const onStartNewGame = (args: { salt?: string }) => {
    if (salt) return;
    if (!args.salt) return;
    if (gameState !== "idle" && gameState !== "game over") return;

    setSalt(args.salt);
    setGameState("playing");
    router.push(`/game/${args.salt}`);
  };

  return (
    <GameEngineContext.Provider
      value={{
        timeline,
        latestItem,
        gameState,
        actions: { startNewGame: onStartNewGame },
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => useContext(GameEngineContext);

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
import { trpc } from "../_trpc/client";

export type GameEngineContextProps = {
  timeline: HistoricEvent[];
  latestItem?: HistoricEvent;
  actions: {};
};

const GameEngineContext = createContext<GameEngineContextProps>(
  {} as GameEngineContextProps,
);
GameEngineContext.displayName = "GameEngineContext";

export const GameEngineProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [salt, setSalt] = useState("");
  const [timeline, setTimeline] = useState<HistoricEvent[]>([]);
  const [latestItem, setLatestItem] = useState<HistoricEvent>();

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

  return (
    <GameEngineContext.Provider value={{ timeline, latestItem, actions: {} }}>
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => useContext(GameEngineContext);

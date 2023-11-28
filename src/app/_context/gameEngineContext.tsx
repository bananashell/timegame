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
import { trpc, trpc2 } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { GameState, HistoricGameEvent } from "@/gameEngine/gameState";
import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { produce } from "immer";
import {
  createNewGame,
  guess,
  lock,
  nextHistoricEvent,
} from "@/gameEngine/actions";

export type GameEngineContextProps = {
  gameState: GameState;
  actions: {
    startNewGame: (args: { salt: string }) => void;
    lockGuess: () => void;
    changeGuess: (year: number) => void;
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
  const [gameState, setGameState] = useState<GameState>(createNewGame(""));

  const onStartNewGame = async (args: { salt: string }) => {
    if (!args.salt) return;
    if (gameState?.state !== "game start" && gameState?.state !== "game over")
      return;

    console.log("starting game", args.salt);
    setGameState(
      produce((draft) => {
        draft = createNewGame(args.salt);
        return draft;
      }),
    );

    router.push(`/game/${args.salt}`);
  };

  useEffect(() => {
    if (gameState.state != "game start") return;
    if (!gameState.salt) return;

    (async () => {
      const newEvents = await trpc2.historicEvents.query({
        salt: gameState.salt,
        pageSize: 2,
      });

      setGameState(
        produce((draft) => {
          const next = newEvents.at(0);
          const afterNext = newEvents.at(1);

          if (!next) throw new Error("No next event");
          return nextHistoricEvent(draft, next, afterNext);
        }),
      );
    })();
  }, [gameState.state, gameState.salt]);

  const onLockGuess = async () => {
    if (!gameState) return;

    const newGameState = lock(gameState);
    setGameState(newGameState);

    if (newGameState.state != "playing") return;
  };

  const onChangeGuess = async (year: number) => {
    if (!gameState) return;

    const newGameState = guess(gameState, year);
    setGameState(newGameState);
  };

  return (
    <GameEngineContext.Provider
      value={{
        gameState,
        actions: {
          startNewGame: onStartNewGame,
          lockGuess: onLockGuess,
          changeGuess: onChangeGuess,
        },
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => useContext(GameEngineContext);

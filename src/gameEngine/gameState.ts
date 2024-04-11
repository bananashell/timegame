import { GameEvent } from "@/data/GameEvent";
import z from "zod";

export type Year = number;
export type GuessableGameEvent = GameEvent & { guess: Year };
export type LockedGameEvent = GuessableGameEvent & { score: number };

export type RootState = {
  id: string;
  currentEvent?: GuessableGameEvent;
  nextEvent?: GameEvent;
  timelineEvents: LockedGameEvent[];
  gameState: GameStartState | PlayingState | GameOverState;
  salt: string;
  gameType: GameType;
  username: string;
  userId: string;
};

type GameState<MainState, SubState> = {
  mainState: MainState;
  subState: SubState;
};

type GameStartState = GameState<"game start", undefined>;
type PlayingState = GameState<
  "playing",
  "guessing" | "displaying correct answer"
>;
type GameOverState = GameState<"game over", "score screen" | "end screen">;

export const gameTypes = z.enum(["all", "music", "history"]);
export type GameType = z.infer<typeof gameTypes>;

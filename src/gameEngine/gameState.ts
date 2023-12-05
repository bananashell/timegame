import { HistoricEvent } from "@/models/historicEvent";

export type Year = number;
export type HistoricGameEvent = HistoricEvent & { guess: Year };
export type LockedHistoricGameEvent = HistoricGameEvent & { score: number };

export type RootState = {
  currentEvent?: HistoricGameEvent;
  nextEvent?: HistoricEvent;
  timelineEvents: LockedHistoricGameEvent[];
  gameState: GameStartState | PlayingState | GameOverState;
  salt: string;
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

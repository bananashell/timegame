import { HistoricEvent } from "@/models/historicEvent";

export type Year = number;
export type HistoricGameEvent = HistoricEvent & { guess: Year };
export type LockedHistoricGameEvent = HistoricGameEvent & { score: number };

export type GameState = {
  currentEvent?: HistoricGameEvent;
  timelineEvents: LockedHistoricGameEvent[];
  state: "game start" | "playing" | "game over";
};

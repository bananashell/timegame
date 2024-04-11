import type { HistoricEvent } from "./historicEvents/historicEvent";
import type { MusicEvent } from "./music/musicEvent";

export type GameEvent = HistoricEvent | MusicEvent;

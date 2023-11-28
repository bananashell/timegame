"use client";

import { useGameEngine } from "@/app/_context/gameEngineContext";
import { TimelineEvent } from "./TimelineEvent";

export const Timeline = () => {
  const { gameState } = useGameEngine();

  return (
    <main>
      {gameState.timelineEvents.map((event) => (
        <TimelineEvent historicEvent={event} key={event.id} />
      ))}
    </main>
  );
};

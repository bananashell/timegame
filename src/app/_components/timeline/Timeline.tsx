"use client";

import { useGameEngine } from "@/app/_context/gameEngineContext";
import { TimelineEvent } from "./TimelineEvent";

export const Timeline = () => {
  const { timeline } = useGameEngine();

  return (
    <main>
      {timeline.map((event) => (
        <TimelineEvent historicEvent={event} key={event.id} />
      ))}
    </main>
  );
};

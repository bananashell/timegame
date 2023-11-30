"use client";

import { orderedTimelineEvents } from "@/app/state";
import { TimelineEvent } from "./TimelineEvent";
import { useAtom } from "jotai";

export const Timeline = () => {
  const [timelineEvents] = useAtom(orderedTimelineEvents);

  return (
    <section className="flex gap-2 py-4">
      {timelineEvents.map((event) => (
        <TimelineEvent historicEvent={event} key={event.id} />
      ))}
    </section>
  );
};

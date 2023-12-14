"use client";

import { orderedTimelineEvents } from "@/app/state";
import { TimelineEvent } from "./TimelineEvent";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";

export const Timeline = () => {
  const [timelineEvents] = useAtom(orderedTimelineEvents);

  return (
    <div className="grid-in-timeline flex flex-col overflow-y-scroll gap-2 py-4">
      <AnimatePresence>
        {timelineEvents.map((event) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
          >
            <TimelineEvent historicEvent={event} key={event.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

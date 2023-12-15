"use client";

import { currentEventAtom, orderedTimelineEvents } from "@/app/state";
import { TimelineEvent } from "./TimelineEvent";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { isDefined } from "@/utils/guards/isDefined";
import { LockedHistoricGameEvent } from "@/gameEngine/gameState";
import { isLockedEvent } from "@/utils/guards/isLockedEvent";

export const Timeline = () => {
  const [timelineEvents] = useAtom(orderedTimelineEvents);
  const [currentEvent] = useAtom(currentEventAtom);

  const inlinedTimelineEvents = useMemo(() => {
    return [...timelineEvents, currentEvent].filter(isDefined).sort((a, b) => {
      const aYear = isLockedEvent(a) ? a.year : a.guess;
      const bYear = isLockedEvent(b) ? b.year : b.guess;
      return bYear - aYear;
    });
  }, [timelineEvents, currentEvent]);

  console.log("inlinedTimelineEvents", inlinedTimelineEvents);

  return (
    <div className="grid-in-timeline flex flex-col items-center overflow-y-scroll gap-2 py-4">
      <AnimatePresence>
        {inlinedTimelineEvents.map((event) => {
          const asArrow = !isLockedEvent(event);
          return (
            <motion.div
              key={asArrow ? "guess" : event.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
            >
              {asArrow && (
                <motion.div
                  key={"guess"}
                  className="text-5xl"
                  initial={{ y: -5 }}
                  animate={{ y: 5 }}
                  transition={{
                    repeatType: "mirror",
                    type: "spring",
                    bounce: 0.8,
                    damping: 20,
                    repeat: Infinity,
                    duration: 1,
                  }}
                >
                  {"<<"} {event.guess} {">>"}
                </motion.div>
              )}
              {!asArrow && (
                <TimelineEvent historicEvent={event} key={event.id} />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

"use client";

import { currentEventAtom, orderedTimelineEvents } from "@/app/state";
import { TimelineEvent } from "./TimelineEvent";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef } from "react";
import { isDefined } from "@/utils/guards/isDefined";
import { isLockedEvent } from "@/utils/guards/isLockedEvent";
import { Place } from "@mui/icons-material";

export const Timeline = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [timelineEvents] = useAtom(orderedTimelineEvents);
  const [currentEvent] = useAtom(currentEventAtom);

  const inlinedTimelineEvents = useMemo(() => {
    return [...timelineEvents, currentEvent].filter(isDefined).sort((a, b) => {
      const aYear = isLockedEvent(a) ? a.year : a.guess;
      const bYear = isLockedEvent(b) ? b.year : b.guess;
      return bYear - aYear;
    });
  }, [timelineEvents, currentEvent]);

  useLayoutEffect(() => {
    arrowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [currentEvent]);

  return (
    <div className="grid-in-timeline line-cla flex flex-row-reverse items-center overflow-y-scroll gap-1 py-4">
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
              {asArrow && event.guess > 0 && (
                <motion.div
                  ref={arrowRef}
                  key={"guess"}
                  className="text-xl px-2 text-black"
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
                  <Place sx={{ fontSize: 40 }} className="text-red-500" />
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

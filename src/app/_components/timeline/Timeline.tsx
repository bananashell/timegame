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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    if (!arrowRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const child = arrowRef.current;

    const child_offsetCenter = child.offsetLeft + child.offsetWidth / 2;
    const scrollLeftOffset = child_offsetCenter - container.offsetWidth / 2;

    container.scrollTo({
      behavior: "auto",
      left: scrollLeftOffset,
    });
  }, [currentEvent]);

  return (
    <div className="grid-in-timeline w-full">
      <div
        ref={scrollContainerRef}
        id="timline-scrollcontainer"
        className="overflow-scroll"
      >
        <div className="flex flex-row-reverse flex-nowrap min-w-full w-fit gap-1 justify-center items-center px-2 py-2">
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
                  {!asArrow && <TimelineEvent event={event} key={event.id} />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

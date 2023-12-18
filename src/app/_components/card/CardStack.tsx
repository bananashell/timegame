"use client";

import { useAtom } from "jotai";
import { currentEventAtom, nextEventAtom } from "@/app/state";
import { HistoricEvent } from "@/models/historicEvent";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const CardStack = () => {
  const [currentEvent] = useAtom(currentEventAtom);
  const [nextEvent] = useAtom(nextEventAtom);

  return (
    <section className="grid-in-current-card relative flex items-center justify-center">
      <AnimatePresence>
        <Card key={`front-${nextEvent?.id}`} historicEvent={currentEvent} />
      </AnimatePresence>
    </section>
  );
};

function Card({ historicEvent }: { historicEvent?: HistoricEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const offscreenHeadingRef = useRef<HTMLHeadingElement>(null);
  const offscreenTextRef = useRef<HTMLParagraphElement>(null);

  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

  if (!historicEvent) return null;

  const headingHeight = offscreenHeadingRef!.current?.offsetHeight ?? 0;
  const textHeight = offscreenTextRef!.current?.offsetHeight ?? 0;

  return (
    <motion.div
      key={historicEvent?.id}
      style={{
        width: "100%",
        x,
        rotate,
      }}
      variants={variantsFrontCard}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cursor-pointer"
    >
      <motion.div
        className="text-black p-8 rounded-xl w-full user-select-none"
        style={{
          backgroundColor: "#fff",
          scale,
          height: headingHeight + 64,
        }}
        layout
        variants={{
          open: {
            height: headingHeight + textHeight + 64,
          },
          close: {
            height: headingHeight + 64,
          },
        }}
        animate={isOpen ? "open" : "close"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <article>
          <h2>{historicEvent?.title}</h2>
          <AnimatePresence>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
              >
                {historicEvent?.description}
              </motion.p>
            )}
          </AnimatePresence>
        </article>

        <aside className="opacity-0 pointer-events-none">
          <h2 ref={offscreenHeadingRef}>{historicEvent?.title}</h2>
          <p ref={offscreenTextRef}>{historicEvent?.description}</p>
        </aside>
      </motion.div>
    </motion.div>
  );
}

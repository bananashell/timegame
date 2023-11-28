"use client";

import { useGameEngine } from "@/app/_context/gameEngineContext";
import { HistoricEvent } from "@/models/historicEvent";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

export const CardStack = () => {
  const { gameState, actions } = useGameEngine();
  const { nextEvent, currentEvent } = gameState;

  return (
    <section className="relative w-full h-52">
      <AnimatePresence initial={false}>
        <Card
          key={`back-${nextEvent?.id}`}
          frontCard={false}
          historicEvent={nextEvent}
        />
        <Card
          key={`front-${nextEvent?.id}`}
          frontCard={true}
          historicEvent={currentEvent}
        />
      </AnimatePresence>
    </section>
  );
};

function Card({
  frontCard,
  historicEvent,
}: {
  frontCard: boolean;
  historicEvent?: HistoricEvent;
}) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };
  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.75, y: 30, opacity: 0.5 },
  };

  return (
    <motion.div
      style={{
        width: 240,
        height: 240,
        position: "absolute",
        top: 0,
        left: "50%",
        translateX: "-50%",
        x,
        rotate,
      }}
      variants={frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={
        frontCard
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
    >
      <motion.div
        className="text-black p-8 w-60 rounded-xl"
        style={{
          aspectRatio: 1.7777777778,
          backgroundColor: "#fff",
          scale,
        }}
      >
        <article>{historicEvent?.description}</article>
      </motion.div>
    </motion.div>
  );
}

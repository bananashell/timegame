import { useGameEngine } from "@/app/_context/gameEngineContext";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export const Guess = () => {
  const { gameState, actions } = useGameEngine();

  const handleChange = () => {};

  return (
    <section className="text-3xl flex flex-col gap-8">
      <h1 className=" text-center">{gameState.currentEvent?.guess}</h1>
      <DragHandle />
    </section>
  );
};

const DragHandle = () => {
  const { gameState, actions } = useGameEngine();

  const x = useMotionValue(0);
  const xDelta = useRef(0);
  const captureValueChange = useRef(false);

  useEffect(() => {
    if (!gameState.currentEvent) return;

    const unsub = x.on("change", (value) => {
      if (!captureValueChange.current) return;
      xDelta.current = x.getVelocity();
      console.log(xDelta.current);
      actions.changeGuess(
        Math.round(gameState.currentEvent!.guess + xDelta.current / 10),
      );
    });

    return () => {
      unsub();
    };
  }, [x, gameState]);

  const onDragStart = () => {
    captureValueChange.current = true;
  };
  const onDragEnd = () => {
    captureValueChange.current = false;
  };
  return (
    <div>
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
        dragElastic={0.5}
        whileTap={{ cursor: "grabbing" }}
        whileDrag={{ scale: 1.2 }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="cursor-grab rounded-xl aspect-video h-20 bg-white"
      />
    </div>
  );
};
DragHandle.displayName = "DragHandle";

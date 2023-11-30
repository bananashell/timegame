import { currentEventAtom } from "@/app/state";
import { useAtom } from "jotai";
import { useGuess, useLock } from "@/app/state/actions";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export const Guess = () => {
  const lockGuess = useLock();
  const [currentEvent] = useAtom(currentEventAtom);

  return (
    <section className="text-3xl flex flex-col gap-8 items-center">
      <h1 className="text-center">{currentEvent?.guess ?? ""}</h1>
      <DragHandle />
      <button onClick={() => lockGuess()} className="bg-white text-black">
        Guess
      </button>
    </section>
  );
};

const DragHandle = () => {
  const guess = useGuess();
  const [currentEvent] = useAtom(currentEventAtom);

  const x = useMotionValue(0);
  const xDelta = useRef(0);
  const captureValueChange = useRef(false);

  useEffect(() => {
    if (!currentEvent) return;

    const unsub = x.on("change", (value) => {
      if (!captureValueChange.current) return;
      xDelta.current = x.getVelocity();
      // console.log(xDelta.current);
      guess(Math.round(currentEvent!.guess + xDelta.current / 10));
    });

    return () => {
      unsub();
    };
  }, [x, currentEvent, guess]);

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

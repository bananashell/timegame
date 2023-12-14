import { currentEventAtom } from "@/app/state";
import { useAtom } from "jotai";
import { useGuess, useLock } from "@/app/state/actions";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { RangeSlider } from "@/app/_components/rangeSlider";

export const Guess = () => {
  const lockGuess = useLock();
  const [currentEvent] = useAtom(currentEventAtom);

  const guess = useGuess();

  return (
    <section className="grid-in-guess text-3xl flex flex-col gap-8 items-center">
      {/* <h1 className="text-center">{currentEvent?.guess ?? ""}</h1> */}
      <input
        type="number"
        className="bg-transparent text-white caret-white text-center text-7xl w-full ring-0 focus:ring-0 focus:outline-none"
        value={currentEvent?.guess ?? ""}
        onChange={(e) => {
          if (!("value" in e.target)) throw new Error("No value in target");
          if (typeof e.target.value !== "string")
            throw new Error("Invalid type");

          guess(+e.target.value);
        }}
      />
      {/* <RangeSlider
        onChange={guess}
        min={-2000}
        max={2023}
        value={currentEvent?.guess ?? 1900}
      /> */}
      {/* <DragHandle /> */}
      <button
        onClick={() => lockGuess()}
        className="bg-white py-2 rounded px-4 text-black"
      >
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

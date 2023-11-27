"use client";
import { Timeline } from "@/app/_components/timeline/Timeline";
import { motion, useMotionValue, useTransform } from "framer-motion";

const MOVE_CONSTRAINT = 30;
export const TimeWheel = () => {
  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["rgb(255,0,0)", "rgb(0,0,0)", "rgb(0,255,0)"],
  );
  x.on("change", (x) => {
    console.log(x);
  });
  return (
    <motion.div style={{ background, width: "150px" }} className="w-80">
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}
        dragSnapToOrigin={true}
        style={{ x }}
        className="bg-red-400 rounded w-16 aspect-square"
      >
        {x}
      </motion.div>
      <Timeline />
    </motion.div>
  );
};

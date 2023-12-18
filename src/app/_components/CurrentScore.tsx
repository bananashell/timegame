import { useAtom } from "jotai";
import { scoreAtom, timelineEventsAtom } from "../state";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { timeout } from "@/utils/timeout";
import { trpc } from "../_trpc/client";

export const CurrentScore = () => {
  const [score] = useAtom(scoreAtom);
  const [timelineEvents] = useAtom(timelineEventsAtom);
  const [scope, animate] = useAnimate();

  const [currentScore, setCurrentScore] = useState(score);
  const lastGuess = timelineEvents.at(0);

  const diff = score - currentScore;

  const animateScore = async () => {
    await animate([
      [
        scope.current,
        {
          scale: [1, 1.1],
          width: [100, 120],
          height: [200, 200],
          rotate: [0, 360],
          borderRadius: ["100%", "10%"],
        } as any,
        { duration: 0.5, type: "spring" },
      ],
      [
        "#current",
        { opacity: [1, 0] },
        { type: "spring", duration: 0.2, at: 0 },
      ],
      [
        "#diff",
        { opacity: [0, 1] },
        { type: "spring", duration: 0.2, at: 0, delay: 0.1 },
      ],
    ]);
    await timeout(500);
    setCurrentScore(score);
    await animate([
      [
        scope.current,
        {
          scale: [1],
          width: [100],
          rotate: [0],
          borderRadius: ["100%"],
        } as any,
        { duration: 0.5, type: "spring" },
      ],
      ["#current", { opacity: [1] }, { type: "spring", duration: 0.2, at: 0 }],
      ["#diff", { opacity: [0] }, { type: "spring", duration: 0.2, at: 0 }],
    ]);
  };

  useEffect(() => {
    if (score == 0) return;
    if (!lastGuess?.score) return;

    animateScore();
  }, [score]);

  return (
    <div className="grid-in-score flex flex-col gap-2 pointer-events-none touch-none">
      <motion.article
        initial={{ opacity: 1, scale: 1 }}
        ref={scope}
        className="flex items-center justify-center user-select-none text-5xl p-6 bg-white rounded-full h-[100px] w-[100px]"
      >
        <div className="text-black relative whitespace-nowrap">
          <motion.div id="current" initial={{ x: 0 }}>
            {currentScore}
          </motion.div>
          <motion.div id="diff" className="absolute top-0 right-0 opacity-0">
            +{diff}
          </motion.div>
        </div>
      </motion.article>

      {process.env.NODE_ENV === "development" && (
        <button
          onClick={animateScore}
          className="text-black bg-white/20 hover:bg-white"
        >
          Animate
        </button>
      )}
    </div>
  );
};

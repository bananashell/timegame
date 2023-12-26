"use client";

import { scoreAtom } from "@/app/state";
import { motion, useAnimate } from "framer-motion";
import { useAtom } from "jotai";
import { HighScore } from "./HighScore";

export const GameOver = () => {
  const [score] = useAtom(scoreAtom);
  const [headerScope, animateHeader] = useAnimate();
  const [youGotScope, animateYouGot] = useAnimate();
  const [scoreScope, animateScore] = useAnimate();

  const animate = async () => {
    // headerScope.animations?.[0]?.play();
    // youGotScope.animations?.[0]?.play();
    // if (!!headerScope.animations[0]) {
    //   headerScope.animations[0].time = 0;
    //   youGotScope.animations[0].time = 0;
    //   scoreScope.animations[0].time = 0;
    // }
    // animateHeader(headerScope.current, { opacity: 0 }, {});
    // animateYouGot(youGotScope.current, { opacity: 0 }, {});
    // await animateScore(scoreScope.current, { opacity: 0 }, {});

    console.log("headerScope", headerScope);

    await animateHeader(
      headerScope.current,
      { opacity: [0, 1], scale: [1, 1.2], y: [10, 0] },
      { duration: 1, type: "spring", stiffness: 200 },
    );
    await animateYouGot(
      youGotScope.current,
      { opacity: [0, 1], scale: [1, 1.2], y: [10, 0] },
      { duration: 1, type: "spring", stiffness: 200, delay: 0.5 },
    );
    await animateScore(
      scoreScope.current,
      { opacity: [0, 1], scale: [1, 1.2], y: [10, 0] },
      { duration: 1, type: "spring", stiffness: 200 },
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center text-white">
      <section className="flex flex-col gap-8">
        <motion.h2 className="text-6xl opacity-0" ref={headerScope}>
          Game over
        </motion.h2>
        <motion.h1 className="text-8xl flex flex-col text-center">
          <small ref={youGotScope} className="text-3xl opacity-0">
            You got
          </small>
          <span ref={scoreScope} className="opacity-0">
            {score}p
          </span>
        </motion.h1>
        <HighScore />
      </section>
    </div>
  );
};

const getScoreText = (score: number) => {
  if (score > 45) {
    return "Wow, that's amazing";
  }
  if (score > 30) {
    return "Not bad, keep it up";
  }
  if (score > 15) {
    return "It's not terrible";
  }
  if (score > 10) {
    return "You can do better than that";
  }

  return "Ouch, that's not a very good score";
};

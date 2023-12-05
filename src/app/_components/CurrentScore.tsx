import { useAtom } from "jotai";
import { scoreAtom } from "../state";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const CurrentScore = () => {
  const [score] = useAtom(scoreAtom);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (score > 0) {
      animate([[scope.current, { scale: [1, 2, 1] }, { type: "spring" }]]);
    }
  }, [score]);

  return (
    <motion.article
      initial={{ opacity: 1 }}
      ref={scope}
      className="text-5xl p-8 absolute top-0 left-0"
    >
      {score}p
    </motion.article>
  );
};

import { useAtom } from "jotai";
import { currentEventAtom, stateAtom } from "../state";
import { motion } from "framer-motion";

export const Score = () => {
  const [currentEvent] = useAtom(currentEventAtom);
  const [state] = useAtom(stateAtom);

  if (
    state.mainState === "playing" &&
    state.subState === "displaying correct answer"
  ) {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.5, y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -100 }}
        className="text-5xl p-8 absolute top-0 left-0"
      >
        Guess: {currentEvent?.guess}
        Answer: {currentEvent?.year}
      </motion.article>
    );
  }

  return null;
};
